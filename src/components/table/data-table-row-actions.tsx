

import AudioPlay from "../AudioPlay"

import TranscribeForm from "@/components/TranscribeForm"
import { DialogCloseButton } from "@/components/modals/ViewTrans"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "@/data/data"
import {
    callSchema
} from "@/data/schema"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { } from "@/app/actions"


interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}





export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {

    const calls = callSchema.parse(row.original)

    const text: string = calls.Call_Name
    const regex = /\[(.*?)\]/;
    const match = text.match(regex);

    const convo = calls.DeepGram
    const formattedString = convo?.replace(/\n/g, "<br>");


    // const sound = new Howl({
    //     src: [calls.Call_Recording]
    // });

    // // Change global volume.
    // Howler.volume(0.5);


    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    {
                        calls.DeepGram ?
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    View Transcript

                                </DropdownMenuItem>
                            </DialogTrigger>
                            :
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    Transcribe

                                </DropdownMenuItem>
                            </DialogTrigger>
                    }


                    <DropdownMenuItem >
                        Listen
                    </DropdownMenuItem>
                    <DropdownMenuItem><DialogCloseButton></DialogCloseButton></DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut >⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {
                formattedString ?
                    <DialogContent >
                        <DialogHeader className="">
                            {/* <DialogTitle >
                                
                            </DialogTitle> */}
                            <div className="flex justify-between items-start my-5 ">
                                <div className="flex items-start gap-4 ">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatars/03.jpg" alt="@shadcn" />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <p>
                                            Phone User: <span className="text-muted-foreground">{
                                                match && match[1]
                                            }</span>
                                        </p>
                                        <p>Duration: <span className="text-muted-foreground">--:---</span></p>
                                        <p>Date: <span className="text-muted-foreground"> --:---</span></p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-xs">Oct 22, 2023, 9:00:00 AM</p>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground max-h-[50vh] " >
                                {
                                    calls.DeepGram &&
                                    <div className="bg-secondary rounded-md p-5 max-h-[50vh]  overflow-auto" dangerouslySetInnerHTML={{ __html: calls.DeepGram }}>

                                    </div>
                                }
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            {/* <Button type="submit">Confirm</Button> */}
                        </DialogFooter>
                    </DialogContent>
                    :
                    <DialogContent>


                        <DialogHeader>
                            <DialogTitle className='mb-5'>Transcribe this call?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. Are you sure you want to permanently
                                delete this file from our servers?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <TranscribeForm call={calls} />
                        </DialogFooter>


                    </DialogContent>
            }

        </Dialog>
    )
}