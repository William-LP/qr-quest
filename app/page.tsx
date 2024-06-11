'use client'

import dynamic from 'next/dynamic'

import SideBar from "@/components/sidebar"
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react"
import QRCode from "react-qr-code"

import { useState } from 'react';

type CheckPoint = {
  coordinates: Coordinates
  hint: string
  name: string
  id: number
}

type Coordinates = {
  lat: number;
  long: number;
}


const Map = dynamic(() => import('@/components/map'), { ssr: false });


export default function Home() {
  const [checkpoints, setCheckpoints] = useState<CheckPoint[]>([]);

  // const onImageDownload = () => {
  //   checkpoints.map((c) => {
  //     const svg = document.getElementById(`qr-code-${c.id - 1}`);
  //     if (svg) {
  //       const svgData = new XMLSerializer().serializeToString(svg);
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       const img = new Image();
  //       img.onload = () => {
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx?.drawImage(img, 0, 0);
  //         const pngFile = canvas.toDataURL("image/png");
  //         const downloadLink = document.createElement("a");
  //         downloadLink.download = c.name;
  //         downloadLink.href = `${pngFile}`;
  //         downloadLink.click();
  //       };
  //       img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  //     }
  //   })
  // };

  const handleLaunchYourAdventure = () => {
    // onImageDownload()
  }


  return (
    <div>
      <Map checkpoints={checkpoints} setCheckpoints={setCheckpoints} />
      <SideBar checkpoints={checkpoints} setCheckpoints={setCheckpoints} />
      <Button onClick={handleLaunchYourAdventure} variant="default" style={{ position: "absolute", bottom: 30, right: 50, zIndex: 999, height: "10vh" }}>
        Launch your adventure <Rocket className="ml-2" />
      </Button>


      {checkpoints.map((checkpoint, index) => (
        <div key={index} style={{ background: 'white', padding: '16px' }}>
          <QRCode key={index} id={`qr-code-${index}`} value={checkpoint.hint} />
        </div>
      ))}
    </div>
  )
}
