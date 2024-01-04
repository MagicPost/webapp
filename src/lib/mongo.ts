import mongoose from 'mongoose';
export const transformObjectIdFromLeanedDoc = (doc: Record<string, any> | null | undefined) => {
  if (!doc || !(doc instanceof Object)) return doc;

  for (const [key, value] of Object.entries(doc)) {
    if (value instanceof mongoose.Types.ObjectId) {
      doc[key] = String(value);
    } else if (value instanceof Object) {
      doc[key] = transformObjectIdFromLeanedDoc(value);
    } else if (Array.isArray(value)) {
      doc[key] = value.map((item) => transformObjectIdFromLeanedDoc(item));
    }
  }

  return doc as any;
};
