// import { Document, Query } from 'mongoose';
// import { NextFunction } from 'express';

// import { IURL } from '../models/urlModel';

// export const assignIdMiddleware = function(
//   this: Query<IURL, IURL>,
//   next: NextFunction
// ) {
//   const doc = this as Document<IURL, IURL>;
//   if (doc.isNew) {
//     doc.constructor
//       .findOne({}, {}, { sort: { id: -1 } })
//       .exec((err, lastDoc) => {
//         if (err) {
//           return next(err);
//         }
//         doc.id = lastDoc ? lastDoc.id + 1 : 1;
//         next();
//       });
//   } else {
//     next();
//   }
// };