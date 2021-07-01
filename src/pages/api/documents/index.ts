import handler from 'next-connect';
import createDocumentHandler from 'src/modules/documents/handlers/createDocumentHandler';

export default handler().post(createDocumentHandler);
