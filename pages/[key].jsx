import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getDocument } from "../firebase/db";


async function downloadImage(imageSrc,name) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

export default function Endpoint() {
  const router = useRouter();

  const { key } = router.query;

  const { data } = useQuery(["getDocument", key], () => getDocument("b",key), {
    enabled: Boolean(key),
    select: (res) => res.data,
  });

  console.log(data);

  return (
    <div>
      {data ? (
        <div className="p-4 bg-slate-100 h-screen flex flex-col gap-4">
          <h1 className="text-slate-600 flex flex-wrap gap-2">
            <p>{data.da_cognome_minore}</p>
            <p>{data.da_nome_minore}</p>
          </h1>
          {data.files.map(({ url, type }, i) => (
            <div className="bg-white rounded-xl drop-shadow-lg" key={i}>
              {type.startsWith("image") ? (
                <div className="p-4 flex justify-between items-center">
                  <img src={url} alt={"Image"} className="w-20 h-20" />
                  <button className="w-10 h-10 p-2" onClick={() => downloadImage(url,`${data.da_cognome_minore} ${data.da_nome_minore} ${i+1}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-500 hover:fill-slate-700" viewBox="0 0 512 512">
                    <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"/>
                  </svg>
                  </button>
                </div>
              ) : (
                <div className="p-4 flex justify-between items-center">
                  <div className="w-20 h-20 flex justify-center items-center font-lg font-bold">PDF</div>
                  <button className="w-10 h-10 p-2" onClick={() => downloadImage(url,`${data.da_cognome_minore} ${data.da_nome_minore} ${i+1}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-500 hover:fill-slate-700" viewBox="0 0 512 512">
                    <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"/>
                  </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-100 h-screen flex items-center justify-center">Caricamento ....</div>
      )}
    </div>
  );
}
