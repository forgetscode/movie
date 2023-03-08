import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../utils/supabase';

export const Authentication = () => {
    return (
        <div className="flex flex-col space-y-16 mx-auto">
            <div className="max-w-full sm:w-[540px] mx-auto mt-32 space-y-16">
            <div className="flex relative overflow-hidden sm:overflow-visible">
                <div className="bg-black py-14 px-16 shadow-form rounded space-y-6">
                <p className="text-3xl font-black mb-10 text-white">Sign in to your account</p>
                <Auth
                    magicLink
                    supabaseClient={supabase as any}
                    appearance={{
                        theme: ThemeSupa,
                        style: {
                        button: {
                            background: 'white',
                            color: 'black',
                            border: '1px solid black',
                        },
                        input: {
                            color: 'white',
                        },
                        },
                    }}
                    theme="light"
                    providers={['google']}
                />
                </div>
            </div>
            </div>
        </div>
    );
};