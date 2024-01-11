'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'

import { NavbarMap } from '@/components'
import { MapComponents } from '@/components'

import infoIcon from '~/icons/info.svg'
import windIcon from '~/icons/wind.svg'
import temperatureIcon from '~/icons/temperature.svg'
import humidityIcon from '~/icons/humidity.svg'
import precipitationIcon from '~/icons/precipitation.svg'
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
  {
    id: 'tp',
    icon: precipitationIcon,
    text: 'Precipitation',
    color: '/assets/tp_color.txt',
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
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    PARAMETERS.map((p) => {
      if (pParameter === p.id) {
        setColorbar(p.color)
      }
    })
  }, [pParameter])

  const colorbarHandler = (c) => {
    setColorbar(c)
  }

  const infoHandler = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="grow relative">
          <div id="map" className="h-full relative z-0"></div>
          <NavbarMap title="Indonesia Numerical Weather Prediction (InaNWP)" />
          <div className="absolute bottom-36 left-4 text-white flex flex-col gap-2">
            {showInfo && (
              <div className="w-[700px] absolute top-0 left-28 bg-[rgba(0,0,0,0.5)] rounded-lg p-4">
                <small>
                  <p>initialTime: set initial time value</p>
                  <p>parameter: set parameter value</p>
                  <p>level: set level value</p>
                  <p>
                    example:
                    {location.host}
                    /meteorologi/inanwp?initialTime=2023111412&parameter=tc&level=1000
                  </p>
                </small>
              </div>
            )}
            <MapComponents.MapLayerCheckContainer>
              <MapComponents.MapLayerCheckButton
                id="info"
                icon={infoIcon}
                text="Info"
                active={false}
                onClick={infoHandler}
              />
            </MapComponents.MapLayerCheckContainer>
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
