import { tv } from "tailwind-variants";

/** Avatar circular do upload (alinhado ao sheet de organização do protótipo). */
export const ENTITY_AVATAR_SIZE_CLASS = "size-12";
export const ENTITY_AVATAR_PX = 48;

export const photoUploadStyles = tv({
  slots: {
    input: "hidden",
    text: "text-sm text-white mb-[5px]",
    container: "flex items-center gap-[14px]",
    cropperContent: `${ENTITY_AVATAR_SIZE_CLASS} relative overflow-hidden rounded-full`,
  },
});
