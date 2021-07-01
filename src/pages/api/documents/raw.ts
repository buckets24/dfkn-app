import { responseErrorWithLogger } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import generatePDF from 'src/modules/documents/api/generatePDF';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

const rawHandler = async (req: NextApiRequest, res: NextApiResponse<Buffer | SimpleError>): Promise<void> => {
  const documentId = req.query.documentId;
  if (typeof documentId === 'string') {
    const buffer = await generatePDF(documentId, req.headers.cookie);

    if (!buffer) {
      responseErrorWithLogger(res, {
        status: 404,
        type: 'RAW_HANDLER_BUFFER_NOT_FOUND',
        message: 'Generate PDF function returned an empty buffer',
        label: 'rawHandler',
      });
      return;
    }

    res.setHeader('Content-Length', Buffer.byteLength(buffer));
    res.setHeader('Content-Type', 'application/pdf');

    res.send(buffer);
  } else {
    responseErrorWithLogger(res, {
      status: 400,
      type: 'MALFORMED_DOCUMENT_ID',
      message: 'Document Id passed to raw.ts is malformed',
      label: 'rawHandler',
    });
  }
};

export default rawHandler;
