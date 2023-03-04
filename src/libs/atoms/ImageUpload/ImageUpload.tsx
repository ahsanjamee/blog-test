import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../Button/Button';

type IImageUploadProps = {
  name: string;
  error?: any;
  register?: any;
  label?: string;
  setValue?: any;
};

const ImageUpload: React.FC<IImageUploadProps> = ({ name, register, error, label, setValue }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [fileErrors, setfileErrors] = useState<any[]>([]);
  const MAX_SIZE = 2000000;

  const Accept = {
    'image/png': ['.png', '.jpg'],
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: Accept,
    maxSize: MAX_SIZE,
    onDrop: (acceptedFiles: any, rejectedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setValue(name, acceptedFiles[0]);
      setfileErrors(rejectedFiles.length > 0 ? rejectedFiles[0].errors : []);
      showText = files.length === 0;
    },
    onDragEnter: () => {
      setFiles([]);
      setfileErrors([]);
    },
  });

  let classes = 'dropzone';
  let showText = files.length === 0;

  const additionalClass = isDragAccept ? 'border-green' : isDragReject ? 'border-primary' : classes;

  const revokeDataUri = (files: any) => {
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  };

  useEffect(
    () => () => {
      revokeDataUri(files);
    },
    [files]
  );

  const onClickHandler = () => {
    revokeDataUri(files);
    setFiles([]);
    setfileErrors([]);
    setValue(name, '');
  };

  const errors = {
    FILESIZE: 'More than 2MB in size',
    FILETYPE: 'Not an image file',
  };

  const getErrorMessage = () => {
    switch (fileErrors[0]?.code) {
      case 'file-invalid-type':
        return <p className={'error'}>{errors.FILETYPE}</p>;
      case 'file-too-large':
        return <p className={'error'}>{errors.FILESIZE}</p>;
      default:
        return <p className={'error'}>File error</p>;
    }
  };
  return (
    <>
      {label && <label>{label}</label>}
      <div
        {...getRootProps({
          className: `${additionalClass} dropzone-wrap`,
        })}
      >
        <input {...getInputProps()} {...register(`${name}`)} name={name} />
        {isDragActive ? (
          isDragReject ? (
            <p>Not an image file</p>
          ) : (
            <p>Drop file here ...</p>
          )
        ) : (
          showText && (fileErrors.length > 0 ? getErrorMessage() : <div>Upload</div>)
        )}
        {files.map((file) => (
          <img alt='Preview' key={file.preview} src={file.preview} className='image-preview' />
        ))}
      </div>
      {files.length > 0 && (
        <div className='image-btn'>
          <Button text='x' variant='primary' onClick={onClickHandler} />
        </div>
      )}
      {files.length === 0 && error?.message && <div className='invalid-feedback'>{error?.message}</div>}
    </>
  );
};

export default ImageUpload;
