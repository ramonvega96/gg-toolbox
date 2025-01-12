/**
 * Small and medium screen sizes should still have the colored border below the header
 * @returns Strip of colored borders for the header banner
 */

function BannerColoredBorder() {
    return (
        <div className="flex">
            <div className="border-b-8 border-primaryBlueDark xl:hidden max-mymd:pl-16 mymd:pl-20 xl:pl-36" />
            <div className="border-b-8 border-secondaryOrange xl:hidden w-full" />
            <div className="border-b-8 border-secondaryYellow xl:hidden w-full" />
            <div className="border-b-8 border-secondaryRed xl:hidden w-full" />
            <div className="border-b-8 border-secondaryGreen xl:hidden w-full" />
            <div className="border-b-8 border-secondaryPink xl:hidden w-full" />
            <div className="border-b-8 border-primaryBlue xl:hidden w-full" />
            <div className="border-b-8 border-primaryBlueDark xl:hidden max-mymd:pr-16 mymd:pr-20 xl:pr-36" />
        </div>
    );
}

export default BannerColoredBorder;
