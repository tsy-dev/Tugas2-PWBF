import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        image: null, 
        hashtags: '', 
    });
    
    const submit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('message', data.message);
        if (data.image) {
            formData.append('image', data.image); 
        }
        formData.append('hashtags', data.hashtags); 
    
        post(route('chirps.store'), {
            data: formData,
            forceFormData: true, 
            onSuccess: () => {

                reset();
                
                setData({ message: '', image: 'No file selected', hashtags: '' });
                
                if (fileInputRef.current) {
                    fileInputRef.current.value = null; 
                }
            },
        });
    };
    

    return (
        <AuthenticatedLayout>
            <Head title="Chirps" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} encType="multipart/form-data">
                    {/* Input untuk pesan */}
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>

                    {/* Input untuk hashtag */}
                    <input
                        type="text"
                        className="mt-2 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        placeholder="Add hashtags"
                        value={data.hashtags}
                        onChange={e => setData('hashtags', e.target.value)}
                    />
                    
                    {/* Input untuk gambar */}
                    <input
                        type="file"
                        className="mt-2 block"
                        accept="image/*"
                        onChange={e => setData('image', e.target.files[0])}
                        
                    />


                    {/* Menampilkan error jika ada */}
                    <InputError message={errors.message || errors.image || errors.hashtags} className="mt-2" />

                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>

                {/* Menampilkan daftar chirps */}
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map(chirp => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
