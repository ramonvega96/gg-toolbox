export interface IImagesPyramid {
    imgSrc1?: string;
    imgAlt1?: string;
    imgSrc2: string;
    imgAlt2: string;
    imgSrc3: string;
    imgAlt3: string;
    imgSrc4?: string;
    imgAlt4?: string;
}

function ImagesPyramid(imagesPyramid: IImagesPyramid) {
    return (
        <div className="flex flex-col items-center mb-4">
            {imagesPyramid.imgSrc1 && (
                <div className="flex mb-2">
                    <img
                        alt={imagesPyramid.imgAlt1}
                        src={imagesPyramid.imgSrc1}
                        className="w-32 h-32 rounded-full flex-shrink-0"
                    />
                </div>
            )}
            <div className="flex text-center text-xs gap-x-4">
                <div className="flex flex-col items-center">
                    <img
                        alt={imagesPyramid.imgAlt2}
                        src={imagesPyramid.imgSrc2}
                        className="w-20 h-20 rounded-full mb-2 flex-shrink-0"
                    />
                    <p className="w-20 m-0 font-roboto text-tbSecondaryBlue">
                        {imagesPyramid.imgAlt2}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        alt={imagesPyramid.imgAlt3}
                        src={imagesPyramid.imgSrc3}
                        className="w-20 h-20 rounded-full mb-2 flex-shrink-0"
                    />
                    <p className="w-20 m-0 font-roboto text-tbSecondaryBlue">
                        {imagesPyramid.imgAlt3}
                    </p>
                </div>
                {imagesPyramid.imgSrc4 && (
                    <div className="flex flex-col items-center">
                        <img
                            alt={imagesPyramid.imgAlt4}
                            src={imagesPyramid.imgSrc4}
                            className="w-20 h-20 rounded-full mb-2 flex-shrink-0"
                        />
                        <p className="w-20 m-0 font-roboto text-tbSecondaryBlue">
                            {imagesPyramid.imgAlt4}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImagesPyramid;
