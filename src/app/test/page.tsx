import React from 'react'
import { transcribeURL } from '@/lib/deepgram'

export default async function page() {

    const data = await transcribeURL("https://zandacallsstorage.blob.core.windows.net/call-recordings/[Waters, Floyd]_116-135_20240520044331(597).wav")

    // console.log(data?.results.channels[0].alternatives[0]);



    return (
        <div>
            {
                data ? <pre>
                    {
                        data.results.channels[0].alternatives[0].paragraphs?.transcript
                    }
                </pre> : "Loading..."
            }
        </div>
    )
}
