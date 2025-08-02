import { embedData } from "../data/embed"
export default function EmbedVideo() {
    return (
        <section className="bg-background text-foreground w-full py-20 border-b border-border scroll-mt-16">
            <div className="container px-4 mx-auto max-w-5xl text-center">
                {/* <h1 className="text-3xl font-bold mb-4 ">{embedData.topic}</h1> */}
                <p className="mb-6 text-xl"><span className="italic">{embedData.topic}</span> by <span className="font-bold">{embedData.creater}</span></p>
                <div className="w-full max-w-2xl mx-auto aspect-video">
                    <iframe 
                        className="w-full h-full" 
                        src={embedData.src}                         
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen></iframe>
                </div>
            </div>
        </section>
    )
}