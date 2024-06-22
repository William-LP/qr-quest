'use client'

import SideBar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { CheckPoint } from "@/types/types";
import { Loader2, Rocket } from "lucide-react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import QRCode from "react-qr-code";
import JSZip from "jszip";
import { saveAs } from "file-saver";



const Map = dynamic(() => import('@/components/map'), { ssr: false });


export default function Home() {
  const [checkpoints, setCheckpoints] = useState<CheckPoint[]>([]);
  const [qrCodeCps, setQrCodeCps] = useState<CheckPoint[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleLaunchYourAdventure = async () => {
    setIsLoading(true)

    const adventure = {
      customerId: 0,
      checkPoints: checkpoints
    }


    const res = await fetch('/api/adventure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    })
    const { checkpoints: cps } = await res.json()

    setQrCodeCps(cps)

  }



  useEffect(() => {
    if (qrCodeCps.length > 0) {
      const processSvgAndDownloadZip = async () => {
        const zip = new JSZip();

        const svgToPng = (svgElement: SVGElement): Promise<string> => {
          return new Promise((resolve, reject) => {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx?.drawImage(img, 0, 0);
              resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = (error) => reject(error);
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
          });
        };

        for (const cp of qrCodeCps) {
          const element = document.getElementById(`qr-code-${cp.id}`);
          if (element && element instanceof SVGElement) {
            try {
              const pngDataUrl = await svgToPng(element);
              const pngData = pngDataUrl.split(',')[1]; // Get base64 part
              zip.file(`${cp.rank}-${cp.name}.png`, pngData, { base64: true });
            } catch (error) {
              console.error(`Error converting SVG to PNG for checkpoint ${cp.id}:`, error);
            }
          } else {
            console.error(`Element with id qr-code-${cp.id} is not an SVGElement`);
          }
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "qr-quest.zip");
      };

      processSvgAndDownloadZip().finally(() => setIsLoading(false));
    }
  }, [qrCodeCps]);

  return (
    <div style={{ overflow: "hidden", padding: 0, margin: 0, height: "100%" }}>
      <Map checkpoints={checkpoints} setCheckpoints={setCheckpoints} />
      <SideBar checkpoints={checkpoints} setCheckpoints={setCheckpoints} />
      <Button disabled={isLoading} onClick={handleLaunchYourAdventure} variant="default" style={{ position: "absolute", bottom: 30, right: 50, zIndex: 999, height: "10vh" }}>
        Launch your adventure
        {isLoading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Rocket className="ml-2" />}
      </Button>

      <div>
        {qrCodeCps.map((cp) => (
          <div key={cp.id} style={{ background: 'white', padding: '16px' }}>
            <QRCode key={cp.id} id={`qr-code-${cp.id}`} value={`${process.env.PUBLIC_URL}/play/${cp.id}`} />
          </div>
        ))}

      </div>
    </div>
  )
}
