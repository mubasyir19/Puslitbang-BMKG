'use client'

import { useState } from 'react'
import Script from 'next/script'

import { Components } from '@/components'
import { MapComponents } from '@/components'

import windIcon from '~/icons/wind.svg'
import temperatureIcon from '~/icons/temperature.svg'
import humidityIcon from '~/icons/humidity.svg'
import dotIcon from '~/icons/dot.svg'

export default function InaNwp() {
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
              <MapComponents.MapLayerButton
                id="wspd"
                icon={windIcon}
                text={'Wind'}
                onClick={() => {
                  colorbarHandler('/assets/wspd_color.txt')
                }}
              />
              <MapComponents.MapLayerButton
                id="tc"
                icon={temperatureIcon}
                text={'Temperature'}
                onClick={() => {
                  colorbarHandler('/assets/tc_color.txt')
                }}
              />
              <MapComponents.MapLayerButton
                id="rh"
                icon={humidityIcon}
                text={'Humidity'}
                onClick={() => {
                  colorbarHandler('/assets/rh_color.txt')
                }}
              />
            </MapComponents.MapLayerContainer>
            <MapComponents.MapLayerContainer id="levelLayerController">
              <MapComponents.MapLayerButton
                id="700"
                icon={dotIcon}
                text={'700'}
              />
              <MapComponents.MapLayerButton
                id="850"
                icon={dotIcon}
                text={'850'}
              />
              <MapComponents.MapLayerButton
                id="1000"
                icon={dotIcon}
                text={'1000'}
                active
              />
            </MapComponents.MapLayerContainer>
            <MapComponents.MapLayerCheckContainer>
              <MapComponents.MapLayerCheckButton
                id="windAnimationLayerControl"
                text={'Wind Animation'}
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
