'use client'

import { useState } from 'react'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'

import { Components } from '@/components'
import { MapComponents } from '@/components'

import windIcon from '~/icons/wind.svg'
import temperatureIcon from '~/icons/temperature.svg'
import humidityIcon from '~/icons/humidity.svg'
import dotIcon from '~/icons/dot.svg'

const PARAMETERS = [
  {
    id: 'wspd',
    icon: windIcon,
    text: 'Wind',
    color: '/assets/wspd_color.txt',
    active: true,
  },
  {
    id: 'tc',
    icon: temperatureIcon,
    text: 'Temperature',
    color: '/assets/tc_color.txt',
    active: false,
  },
  {
    id: 'rh',
    icon: humidityIcon,
    text: 'Humidity',
    color: '/assets/rh_color.txt',
    active: false,
  },
]

const LEVELS = [
  {
    id: '200',
    icon: dotIcon,
    text: '200',
    active: false,
  },
  {
    id: '500',
    icon: dotIcon,
    text: '500',
    active: false,
  },
  {
    id: '700',
    icon: dotIcon,
    text: '700',
    active: false,
  },
  {
    id: '850',
    icon: dotIcon,
    text: '850',
    active: false,
  },
  {
    id: '1000',
    icon: dotIcon,
    text: '1000',
    active: true,
  },
]

export default function InaNwp() {
  const searchParams = useSearchParams()
  const pParameter = searchParams.get('parameter')
  const pLevel = searchParams.get('level')
  const [colorbar, setColorbar] = useState('/assets/wspd_color.txt')

  const colorbarHandler = (c) => {
    setColorbar(c)
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="grow relative">
          <div id="map" className="h-full relative z-0"></div>
          <Components.NavbarMap title="Indonesia Numerical Weather Prediction (InaNWP)" />
          <div className="absolute top-40 left-4 text-white flex flex-col gap-2">
            <MapComponents.MapLayerContainer id="variableLayerController">
              {PARAMETERS.map((p, key) => (
                <MapComponents.MapLayerButton
                  key={key}
                  id={p.id}
                  icon={p.icon}
                  text={p.text}
                  onClick={() => {
                    colorbarHandler(p.color)
                  }}
                  active={pParameter !== null ? pParameter === p.id : p.active}
                />
              ))}
            </MapComponents.MapLayerContainer>
            <MapComponents.MapLayerContainer id="levelLayerController">
              {LEVELS.map((l, key) => (
                <MapComponents.MapLayerButton
                  key={key}
                  id={l.id}
                  icon={l.icon}
                  text={l.text}
                  active={pLevel !== null ? pLevel === l.id : l.active}
                />
              ))}
            </MapComponents.MapLayerContainer>
            <MapComponents.MapLayerCheckContainer>
              <MapComponents.MapLayerCheckButton
                id="windAnimationLayerControl"
                text={'Wind Animation'}
              />
              <MapComponents.MapLayerCheckButton
                id="valueLabelLayerControl"
                text={'Value Label'}
              />
            </MapComponents.MapLayerCheckContainer>
          </div>

          <div className="absolute bottom-20 bg-[rgba(0,0,0,0.3)] px-4 py-2 text-white">
            <MapComponents.MapTimeControl />
          </div>

          <div
            id="mapPlayer"
            className="absolute flex w-screen bottom-0 bg-[rgba(0,0,0,0.3)] text-white p-4 gap-4"
          >
            <MapComponents.MapPlayer />
            <MapComponents.MapColorbar colorbar={colorbar} />
          </div>
        </div>
      </div>

      <Script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" />
      <Script src="//d3js.org/d3.v4.min.js" />
      <Script src="//npmcdn.com/geotiff@0.3.6/dist/geotiff.js" />
      <Script src="/js/leaflet.canvaslayer.field.js" />
      <Script src="/js/map.js" strategy="lazyOnload" />
      <Script src="/js/map-control.js" strategy="lazyOnload" />
    </>
  )
}
