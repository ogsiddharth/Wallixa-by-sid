import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

export async function increaseLike(id: string) {
  await updateDoc(doc(db, "wallpapers", id), {
    likes: increment(1),
  });
}