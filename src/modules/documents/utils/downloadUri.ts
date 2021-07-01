export default function downloadURI(uri: string, fileName: string): void {
  const link = document.createElement('a');
  link.setAttribute('download', fileName);
  link.href = uri;
  link.click();
  link.remove();
}
