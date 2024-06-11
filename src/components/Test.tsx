'use client'

import { useState } from 'react'

interface ICall {
    Call_Name: string,
    Call_Recording: string
}

export default function Test({ data }: { data: string }) {

    const newData = JSON.parse(data)

    return (
        <div>

            {data &&
                newData.map((x: ICall, y: number) => {
                    const regex = /\[(.*?)\]/;
                    const match = x.Call_Name.match(regex);
                    return (
                        <pre key={y}>
                            {
                                match && (match[1] ? match[1] : "empty")

                            }
                        </pre>
                    )
                })
            }

        </div>
    )
}
