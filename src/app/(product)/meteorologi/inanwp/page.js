import Script from 'next/script'
import { Components } from '@/components'

export default function Inarcm() {
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="grow relative">
          <div id="map" className="h-full relative z-0"></div>
          <Components.NavbarMap title="Indonesia Numerical Weather Prediction (InaNWP)" />
          <div className="absolute bottom-0 z-10 flex w-screen">
            <button
              id="btnPrev"
              className="bg-slate-400 p-4 rounded ml-1 flex-none"
            >
              {'<'}
            </button>
            <button
              id="btnNext"
              className="bg-slate-400 p-4 rounded ml-1 flex-none"
            >
              {'>'}
            </button>
            <input id="dateRange" type="range" className="grow mx-2" />
          </div>
        </div>
      </div>

      <Script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" />
      <Script src="//d3js.org/d3.v4.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js" />
      <Script src="/js/leaflet.canvaslayer.field.js" />
      <Script src="/js/inanwp.js" />
    </>
  )
}
