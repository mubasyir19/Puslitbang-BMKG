import Script from 'next/script'

export default function Inarcm() {
  return (
    <>
      <div className="h-full flex flex-col">
        <h1 className="text-white text-center font-bold text-2xl mb-2">
          Indonesia Regional Climate Model (InaRCM) using RegCM Model
        </h1>
        <div className="grow relative">
          <div id="map" className="h-full relative z-0"></div>
          <div className="absolute z-10 top-0 right-0">
            <div className="flex flex-col">
              <button
                type="button"
                className="p-4 text-white bg-slate-400 hover:bg-slate-200"
                id="ButtonWind"
              >
                Wind
              </button>
              <button
                type="button"
                className="p-4 text-white bg-slate-400 hover:bg-slate-200"
                id="ButtonTemp"
              >
                Temp
              </button>
            </div>
          </div>
        </div>
      </div>

      <Script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js" />
      <Script src="//d3js.org/d3.v4.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js" />
      <Script src="/js/leaflet.canvaslayer.field.js" />
      <Script src="/js/map.js" />
    </>
  )
}
