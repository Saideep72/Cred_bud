import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../common/Card';
import { Button } from '../common/Button';
import { Upload, File, Check, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TransactionUpload = () => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prev => [...prev, ...acceptedFiles]);
        toast.success(`${acceptedFiles.length} file(s) added successfully`);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx', '.xls']
        }
    });

    const handleUpload = () => {
        // Mock upload
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 2000)),
            {
                loading: 'Uploading and analyzing...',
                success: 'Transactions uploaded successfully!',
                error: 'Upload failed',
            }
        );
        setFiles([]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Upload Transactions</h1>
                <p className="text-gray-600 mt-2">Upload your bank statement (CSV/Excel) to boost your credit score.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Drag & Drop Upload</CardTitle>
                    <CardDescription>Supported formats: .csv, .xlsx, .xls</CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
                            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary hover:bg-gray-50"}`}
                    >
                        <input {...getInputProps()} />
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Upload className="h-6 w-6" />
                        </div>
                        {isDragActive ? (
                            <p className="text-primary font-medium">Drop the files here...</p>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                                <p className="text-sm text-gray-500">Max file size: 10MB</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {files.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Files to Upload ({files.length})</h3>
                    <div className="space-y-2">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <File className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                        <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setFiles(files.filter((_, i) => i !== idx))}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button onClick={handleUpload}>
                            Start Upload Processing
                        </Button>
                    </div>
                </div>
            )}

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                    Your data is encrypted and used only for credit scoring generation. We do not store your raw banking credentials.
                </p>
            </div>
        </div>
    );
};

export default TransactionUpload;
