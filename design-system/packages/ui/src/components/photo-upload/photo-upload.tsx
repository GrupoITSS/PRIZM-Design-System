import { cn } from "../../lib/cn";
import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Avatar } from "../avatar";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Dropzone } from "../dropzone";
import { FieldError } from "../field";
import { Loader2, Upload } from "../icons";
import {
  photoUploadStyles,
  ENTITY_AVATAR_PX,
  ENTITY_AVATAR_SIZE_CLASS,
} from "./photo-upload.styles";
import type { PhotoUploadProps, PixelCrop } from "./photo-upload.types";

export function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<string> {
  const image = new Image();
  image.src = imageSrc;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const fileUrl = URL.createObjectURL(blob);
      resolve(fileUrl);
    }, "image/jpeg");
  });
}

const IMAGE_ACCEPT = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
];

function resolveImageSrc(src: string): string | undefined {
  if (
    src.startsWith("data:image") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("blob:")
  ) {
    return src;
  }
  return undefined;
}

function resolveFallback(emptyLabel?: string): string {
  const initial = emptyLabel?.trim()?.charAt(0);
  return initial ? initial.toUpperCase() : "?";
}

export const PhotoUpload = ({
  enableCropping = false,
  editing = false,
  loading,
  value,
  setValue,
  label,
  error,
  required,
  emptyLabel = "",
  dialogContentClassName,
  dialogOverlayClassName,
}: PhotoUploadProps) => {
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState<string | undefined>(value || undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [invalidFilesMessage, setInvalidFilesMessage] = useState<string>();

  const { container, cropperContent } = photoUploadStyles();
  const fallback = resolveFallback(emptyLabel);
  const previewSrc = image ? resolveImageSrc(image) : undefined;

  // Follow the `value` prop when it changes, during render
  // (https://react.dev/learn/you-might-not-need-an-effect).
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setImage(value || undefined);
  }

  const applyImageFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        if (!enableCropping) {
          setValue(result);
        }
        setInvalidFilesMessage(undefined);
        setIsUploadOpen(false);
      };
      reader.readAsDataURL(file);
    },
    [enableCropping, setValue],
  );

  const handleRemoveImage = () => {
    setImage(undefined);
    setValue("");
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        setValue(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, setValue]);

  useEffect(() => {
    if (enableCropping) {
      const timer = setTimeout(() => {
        if (croppedAreaPixels) {
          void handleCrop();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [croppedAreaPixels, handleCrop, enableCropping]);

  const closeUploadDialog = () => {
    setIsUploadOpen(false);
    setInvalidFilesMessage(undefined);
  };

  return (
    <div className={cn(container(), "relative")}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      <div className="shrink-0">
        {image && enableCropping ? (
          <div className={cn(cropperContent(), "relative")}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              initialCroppedAreaPercentages={{
                height: 79,
                width: 79,
                x: 0,
                y: 0,
              }}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                },
                cropAreaStyle: { border: "none" },
              }}
              cropSize={{ width: ENTITY_AVATAR_PX, height: ENTITY_AVATAR_PX }}
            />
          </div>
        ) : (
          <Avatar
            size="xl"
            src={previewSrc}
            alt="Foto do perfil"
            fallback={fallback}
            className={cn(
              ENTITY_AVATAR_SIZE_CLASS,
              "!size-12 border border-border [&_[data-slot=avatar-fallback]]:bg-muted [&_[data-slot=avatar-fallback]]:text-sm [&_[data-slot=avatar-fallback]]:font-semibold [&_[data-slot=avatar-fallback]]:text-muted-foreground",
            )}
          />
        )}
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {label && (
          <p className="text-sm font-light text-foreground leading-5">
            {label}
            {required ? (
              <span className="text-destructive ml-0.5" aria-hidden>
                *
              </span>
            ) : null}
          </p>
        )}
        <div className="flex gap-2">
          <Dialog
            open={isUploadOpen}
            onOpenChange={(open) => {
              setIsUploadOpen(open);
              if (!open) setInvalidFilesMessage(undefined);
            }}
          >
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="default"
                className="self-start"
                disabled={loading}
                aria-required={required || undefined}
              >
                <Upload className="size-4 text-muted-foreground" />
                Escolher imagem
              </Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton
              closeLabel="Fechar"
              overlayClassName={dialogOverlayClassName}
              className={cn(
                "flex w-full flex-col items-stretch overflow-hidden !gap-0 !p-0",
                dialogContentClassName ?? "sm:max-w-lg",
              )}
            >
              <DialogHeader className="shrink-0 space-y-0 px-6 pt-6 pb-0 text-left">
                <DialogTitle className="text-lg font-semibold leading-none text-foreground">
                  Adicionar imagem
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="sr-only">
                Arraste um arquivo para a área abaixo ou clique para procurar no computador.
              </DialogDescription>
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-3">
                  <Dropzone
                    accept={IMAGE_ACCEPT}
                    multiple={false}
                    label="Clique para procurar"
                    secondaryLabel="ou arraste a imagem nesta área"
                    description="Formatos: PNG, JPG, WEBP ou GIF"
                    onFileSelect={applyImageFile}
                    onInvalidFiles={() =>
                      setInvalidFilesMessage("Arquivo inválido. Use PNG, JPG, WEBP ou GIF.")
                    }
                  />
                  <FieldError>{invalidFilesMessage}</FieldError>
                </div>
              </div>
              <DialogFooter className="shrink-0 px-6 pb-6 pt-2 sm:justify-end">
                <Button type="button" variant="outline" onClick={closeUploadDialog}>
                  Cancelar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {image && !editing && (
            <Button type="button" variant="destructive" size="default" onClick={handleRemoveImage}>
              Remover
            </Button>
          )}
        </div>
        <FieldError>{error}</FieldError>
      </div>
    </div>
  );
};
