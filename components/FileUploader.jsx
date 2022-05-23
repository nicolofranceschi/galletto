import Image from "next/image";
import { upload } from "../firebase/storage";
import { useCallback } from "react";
import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";


const compressFile = async (file) =>
  new Promise((success, error) => {
    new Compressor(file, { quality: 0.1, success, error });
  });

export default function FileUploader({ files, setFiles , percent, setPercent }) {

  const onDrop = useCallback(async (acceptedFiles) => {
    const files = await Promise.all(
      acceptedFiles.map(async (file) => ({
        file: !file.type.startsWith("image") ? file : await compressFile(file),
        preview: URL.createObjectURL(file),
        type: file.type,
      }))
    );
    const urls = await Promise.all(
      files.map(({ file }) => upload({ file, name: file.name, setPercent }))
    );
    setFiles((value) => [
      ...value,
      ...files.map(({ preview, type }, i) => ({ preview, url: urls[i], type })),
    ]);
    setPercent(0);

  }, [setFiles,setPercent]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-full p-4 flex flex-wrap gap-4  rounded-xl drop-shadow-2xl bg-white"
    >
      {files.map(({ preview, type, url }, i) => (
        <div
          key={i}
          className="h-20 w-20 flex-grow border-2 max-w-xs relative rounded-xl"
        >
          {type.startsWith("image") ? (
            <Image
              alt="preview"
              src={preview}
              height="300"
              whith="300"
              layout="fill"
              className="rounded-xl "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-bold">
              PDF
            </div>
          )}
          <div
            onClick={() =>
              setFiles((files) => files.filter((file) => file.url !== url))
            }
            className="absolute top-[-5px] right-[-5px] h-6 w-6 bg-red-700 rounded-[50%] drop-shadow-lg flex justify-center items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </div>
        </div>
      ))}
      {files.length === 0 && (
        <div className="h-20 w-full flex  flex-col gap-2 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#5abbe7"
            height="30px"
            whith="30px"
          >
            <path
              className="opacity-40"
              d="M105.4 182.6c-12.49-12.49-12.49-32.75 0-45.25l128-128C239.6 3.125 247.8 0 256 0s16.38 3.125 22.62 9.375l128 128c12.49 12.49 12.49 32.75 0 45.25c-12.5 12.49-32.76 12.5-45.25 .001L288 109.3V352c0 17.67-14.33 32-32 32c-17.67 0-32-14.33-32-32V109.3L150.6 182.6C138.1 195.1 117.9 195.1 105.4 182.6z"
            />
            <path
              className="opacity-100"
              d="M480 352h-160c0 35.35-28.65 64-64 64s-64-28.65-64-64H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456z"
            />
          </svg>
          <h2 className="text-center">Tascina o clicca per aggiungere il libretto dello sportivo</h2>
        </div>
      )}
      <input {...getInputProps()} />
      <div
        className="absolute bottom-0 left-0 h-2 bg-cyan-600 rounded-xl"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
