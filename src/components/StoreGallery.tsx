import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
const advancedSlides = Array.from({ length: 19 }, (_, i) => {
    const index = String(i).padStart(2, "0");
    return {
        src: `/assets/gallery/gallery${index}.webp`,
        title: `${index}/20`,
        description: `Image ${index}`,
    };
});
export default function StoreGallery() {
    const [open, setOpen] = React.useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    return (
        <div className="w-full bg-gray-200 px-4 py-10 text-center font-raleway" id="gallery" >
            <div >
                <h2 className="text-[30px] font-semibold text-gray-700 mb-4">
                    Store Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {advancedSlides.map((slide, idx) => (
                        <button
                            key={slide.src}
                            onClick={() => {
                                setCurrentIndex(idx);
                                setOpen(true);
                            }}
                            className="focus:outline-none shadow  hover:opacity-70 active:opacity-70 cursor-pointer transition-opacity duration-300  "
                            type="button"
                        >
                            <img
                                src={slide.src}
                                alt={slide.title}
                                className="object-cover w-full rounded  block shadow inset-shadow-sm aspect-[3/4] h-70 max-lg:h-auto  transition-transform duration-300 max-md:mb-4"
                            />
                        </button>
                    ))}
                </div>
            </div>


            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={advancedSlides}
                index={currentIndex}
                plugins={[Captions, Fullscreen, Slideshow, Zoom]}
                captions={{
                    descriptionTextAlign: "start",
                }}

            />
        </div>
    );
}
