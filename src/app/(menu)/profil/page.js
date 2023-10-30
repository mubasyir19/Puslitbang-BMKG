import Script from 'next/script'
import Image from 'next/image'

export default function Profile() {
  return (
    <>
      <title>Puslitbang BMKG</title>
      <div className=" flex flex-col">
        <h1 className=" text-center font-bold text-2xl mb-2">
          Profil Divisi Puslitbang BMKG
        </h1>
      </div>
      <div className="flex-col">
        <div className="space-y-2 sm:text-left">
          <h1 className=" font-bold text-2xl mb-2">
            Bagan Struktur Puslitbang BMKG
          </h1>
          <hr className="w-18 border-2 border-white my-auto" />
        </div>
      </div>
      <div className="flex px-20">
        <Image
          className="mx-auto"
          src="/images/struktur.jpg"
          width={1000}
          height={900}
          alt="Picture of the author"
        />
      </div>
      <div className="flex-col mt-10">
        <div className="text-center space-y-2 sm:text-left">
          <h1 className=" text-center font-bold text-2xl mb-2">VISI MISI</h1>
          <hr className="w-18 border-2 border-white my-auto" />
        </div>
      </div>
    </>
  )
}
