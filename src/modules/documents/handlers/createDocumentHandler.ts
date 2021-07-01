import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { AsyncReturnType } from 'type-fest';
import { createDocument } from '../documentService';

export type CreateDocumentHandlerResponse = AsyncReturnType<typeof createDocument>;

const createDocumentHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<CreateDocumentHandlerResponse | SimpleError>
> = (req, res) => {
  const { body } = req;
  res.status(200).json(body);
};

export default createDocumentHandler;
