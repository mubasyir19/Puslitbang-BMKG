'use client'

import useSWR from 'swr'
import { fetcherExt } from '@/helpers/fetcher'
import { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'
import { RiAlertFill } from 'react-icons/ri'

export default function AutoGempa() {
  const { data } = useSWR('/api/autogempa', fetcherExt)
  const [gempaShow, setGempaShow] = useState(false)
  const [lastGempa, setLastGempa] = useState('')

  useEffect(() => {
    if (data) {
      const now = new Date()
      const gempaTime = new Date(data.DateTime)

      if (now - gempaTime < 5 * 60000 && lastGempa !== data.DateTime) {
        setGempaShow(true)
        setLastGempa(data.DateTime)
      }
    }
  }, [data])

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute bottom-0 right-0">
            <RiAlertFill
              className="w-16 h-16 fill-orange-500 mb-4 cursor-pointer"
              onClick={() => setGempaShow(true)}
            />
          </div>
        </div>
      </div>
      {gempaShow && (
        <div className="fixed flex w-full h-screen bg-black bg-opacity-50 top-0 left-0 z-50">
          {data && (
            <div className="relative w-full max-w-6xl bg-white m-auto rounded-xl overflow-hidden">
              <div className="absolute top-0 right-0">
                <IoIosClose
                  className="w-16 h-16 cursor-pointer"
                  onClick={() => setGempaShow(false)}
                />
              </div>
              <div>
                <h1 className="font-bold text-2xl mt-4 ml-4">
                  {`Gempabumi Terkini: ${data.Tanggal}, ${data.Jam}`}
                </h1>
              </div>
              <div className="relative flex">
                <div className="w-1/2">
                  <img src={data.Shakemap} className="w-full h-full" />
                </div>
                <div className="w-1/2 flex flex-col gap-4 my-auto">
                  <DetailItem
                    img="https://bmkg.go.id/asset/img/gempabumi/magnitude.png"
                    title="Magnitudo"
                    value={data.Magnitude}
                  />
                  <DetailItem
                    img="https://bmkg.go.id/asset/img/gempabumi/kedalaman.png"
                    title="Kedalaman"
                    value={data.Kedalaman}
                  />
                  <DetailItem
                    img="https://bmkg.go.id/asset/img/gempabumi/koordinat.png"
                    title="Lokasi"
                    value={`${data.Lintang} - ${data.Bujur}`}
                  />
                  <DetailItem
                    img="https://bmkg.go.id/asset/img/gempabumi/lokasi.png"
                    title="Pusat Gempa"
                    value={data.Wilayah}
                  />
                  <DetailItem
                    img="https://bmkg.go.id/asset/img/gempabumi/wilayah-dirasakan.png"
                    title="Dirasakan (Skala MMI)"
                    value={data.Dirasakan}
                  />
                  <div>
                    <a
                      href="https://bmkg.go.id/gempabumi-dirasakan.html"
                      target="_blank"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Selengkapnya
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

function DetailItem({ img, title, value }) {
  return (
    <div className="flex items-center gap-4">
      <img src={img} className="w-16 h-16" />
      <div>
        <p className="font-bold">{title}</p>
        <p>{value}</p>
      </div>
    </div>
  )
}
