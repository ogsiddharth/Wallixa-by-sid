import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

export async function increaseDownload(id: string) {
  await updateDoc(doc(db, "wallpapers", id), {
    downloads: increment(1),
  });
}