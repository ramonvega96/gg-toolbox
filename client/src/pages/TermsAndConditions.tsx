import { useIntl } from 'react-intl';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

function TermsAndConditions() {
    const messages = useIntl();

    return (
        <div>
            <Header toggleBanner={true} />
            <div className="flex bg-primaryBlue pb-12 pt-20 lg:flex-row">
                <div className="xl:w-1/2 md:w-full sm:w-full mdsm:w-full xs:w-full text-left text-white flex flex-col  max-mymd:ml-16 mymd:ml-20 xl:ml-36">
                    <h1 className="font-omnes pb-12 text-4xl text-white max-mdsm:text-2xl">
                        {messages.formatMessage({
                            id: 'T&C',
                        })}
                    </h1>
                    <h5 className="w-full text-left md:text-2xl font-normal pr-28">
                        {messages.formatMessage({
                            id: 'T&CDescription',
                        })}
                    </h5>
                </div>
            </div>
            <div
                id="terms-and-conditions-container"
                className="border-b-8 border-secondaryOrange"
            >
                <div className="bg-white max-mymd:mx-16 mymd:mx-20 xl:mx-36 mb-32 ">
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-1',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph11',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph12',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph13',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-2',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph21',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph22',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph23',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-3',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph31',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph32',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph33',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph34',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph35',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph36',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-4',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph41',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph42',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph43',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph44',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-5',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph51',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph52',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph53',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph54',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph55',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph56',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph57',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-6',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph61',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-7',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph71',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph72',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-8',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph81',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph82',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph83',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph84',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph85',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph86',
                        })}
                    </p>
                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        {messages.formatMessage({
                            id: 'T&CHeader-9',
                        })}
                    </h2>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph91',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph92',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph93',
                        })}
                    </p>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph94',
                        })}
                    </p>

                    <h2 className="font-forma font-bold text-primaryBlueDark mt-10">
                        UQ Promotional Games
                    </h2>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Terms and Conditions (Games of Chance)
                    </h3>
                    <ol className="list-decimal list-inside mb-4">
                        <li>
                            By entering this promotion, you accept these Terms
                            and Conditions.
                        </li>
                        <li>
                            Instructions and information on how to enter this
                            promotion form part of these Terms and Conditions.
                        </li>
                        <li>
                            The promoter is The University of Queensland (ABN 63
                            942 912 684) of St Lucia, Queensland, 4072
                            (“Promoter”).
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Eligible entrants
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={4}
                    >
                        <li>
                            To be eligible to enter this promotion, you must:
                            <ul className="list-[lower-alpha] list-inside mb-4">
                                <li>
                                    be an Australian resident over the age of 18
                                    years;
                                </li>
                                <li>
                                    not be affiliated with the Grow&Go Toolbox;
                                </li>
                                <li>
                                    complete the online feedback survey in full;
                                </li>
                            </ul>
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        How to enter
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={5}
                    >
                        <li>
                            Entry will be open from 00:01 AEST on 12/08/2024 and
                            closes at 23:59 AEST on 08/09/2024 (“Entry Period”).
                            Entries received outside of the Entry Period will
                            not be accepted.
                        </li>
                        <li>
                            To enter, you must, during the Entry Period:
                            <ul className="list-[lower-alpha] list-inside mb-4">
                                <li>
                                    visit the Grow&Go Toolbox at{' '}
                                    <a href="http://www.growandgotoolbox">
                                        www.growandgotoolbox
                                    </a>{' '}
                                    and use the website; and
                                </li>
                                <li>
                                    complete the feedback survey and register
                                    for the promotion by providing your email
                                    address when prompted.
                                </li>
                            </ul>
                        </li>
                        <li>
                            You will receive one entry into the promotion by
                            performing the activities listed in clause 6. You
                            may not enter the promotion more than once.
                        </li>
                        <li>
                            All entries become the property of the Promoter.
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Prize draw
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={9}
                    >
                        <li>
                            The prize draw will take place at 12:00 AEST on
                            02/09/2024 at The University of Queensland, St Lucia
                            Campus. The first 10 valid entries drawn will
                            receive the prize.
                        </li>
                        <li>
                            The Promoter may decline to accept any entry which,
                            in its reasonable opinion, does not comply with
                            these Terms and Conditions.
                        </li>
                        <li>
                            The Promoter’s decision in relation to any aspect of
                            the promotion is final and the Promoter will not
                            enter into any correspondence regarding the result
                            of the promotion.
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Prizes and notification of winners
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={12}
                    >
                        <li>
                            The winner will receive 1 x $50 Prezzee Smart eGift
                            Card, which will be sent to their email address and
                            are valid for 3 years.
                        </li>
                        <li>
                            Prizes are not transferable and cannot be taken as
                            cash.
                        </li>
                        <li>
                            The winner will be contacted by email using the
                            email address provided on their entry form on or by
                            30/09/2024. The results will not be published.
                        </li>
                        <li>
                            To claim the prize, the winner must follow
                            instructions from Prezzee to access the gift card.
                            The prize must be claimed by 30/12/2024 being a date
                            at least 3 months after the date of the initial
                            draw.
                        </li>
                        <li>
                            The Promoter will use reasonable efforts to locate
                            the winner. If the Promoter is unable to locate the
                            winner within 3 months after the draw, the prize
                            will be redrawn.
                        </li>
                        <li>
                            The second chance draw will be held on 06/01/2025
                            being a date at least 3 months after the date of the
                            initial draw at the same time and place as the
                            initial draw in order to distribute any unclaimed
                            prizes. The winner of the second chance draw will be
                            contacted by email using the email address provided
                            on their entry form on or by 31/01/2025.
                        </li>
                        <li>
                            The prize will be delivered to the winner by email
                            within 1 day after the prize being claimed.
                        </li>
                        <li>
                            If any prize becomes unavailable for any reason, the
                            Promoter may substitute a prize of equal or greater
                            value.
                        </li>
                        <li>
                            The Promoter accepts no responsibility for any tax
                            implications that may arise for any prize.
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Intellectual property
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={21}
                    >
                        <li>
                            You confirm and promise that your entry is original
                            and does not infringe the intellectual property
                            rights of any third party. You agree that the
                            Promoter has an unrestricted, irrevocable,
                            transferable, right and licence to use and modify
                            your entry including for promotional purposes
                            without the payment of any further fee or
                            compensation or further reference to you, and that
                            the Promoter can authorise other people to do any of
                            these things. If requested by the Promoter, you
                            agree to sign any further documentation required by
                            the Promoter to give effect to this arrangement. To
                            the extent permitted by law, you unconditionally and
                            irrevocably consent to the Promoter modifying your
                            entry as described in this clause, agree that the
                            Promoter is not required to attribute you as author
                            of the entry, and consent to any other act or
                            omission that would otherwise infringe any moral
                            rights in your entry.
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Withdrawal from promotion
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={22}
                    >
                        <li>
                            You may withdraw from the promotion at any time
                            before notification of the winners by notifying the
                            Promoter on 0417482145. If you withdraw from the
                            promotion, the Promoter will remove your entry and
                            will not use your details or entry for media or
                            promotional purposes. If you withdraw from the
                            promotion, you will no longer be eligible to win a
                            prize.
                        </li>
                    </ol>
                    <h3 className="font-forma font-bold text-primaryBlueDark mt-2">
                        Miscellaneous
                    </h3>
                    <ol
                        className="list-decimal list-inside mb-4"
                        start={23}
                    >
                        <li>
                            Entries which, in the opinion of the Promoter, are
                            incomplete, incorrect or incomprehensible, contain
                            defamatory or offensive content or infringe
                            intellectual property rights are not eligible to win
                            and may be removed from the promotion and the
                            relevant entrant will be disqualified.
                        </li>
                        <li>
                            The Promoter may, in its absolute discretion,
                            disqualify you if, in the opinion of the Promoter,
                            you breach these Terms and Conditions, engage in
                            dishonest or unethical conduct in relation to the
                            promotion, manipulate, tamper or interfere with the
                            conduct of the promotion, do not comply with the
                            entry process, or conspire with others to gain an
                            unfair advantage. The Promoter may investigate the
                            matter if it suspects you of having engaged in such
                            breach or conduct.
                        </li>
                        <li>
                            The Promoter may request information from you
                            relevant to entry or participation in the promotion,
                            such as proof of residency or age. The Promoter may,
                            in its absolute discretion, disqualify you if you
                            provide insufficient information, false information
                            or fail to provide information.
                        </li>
                        <li>
                            The Promoter is not responsible for late, lost or
                            misdirected entries.
                        </li>
                        <li>
                            The Promoter is not responsible for any delays,
                            problems or technical malfunction of any telephone
                            network or lines, computer systems, computer
                            equipment or software, technical problems or traffic
                            congestion on the Internet or at any website, or any
                            combination thereof, including any injury or damage
                            to your or any other person’s computer related to or
                            resulting from entering this promotion. If such
                            problems arise, then the Promoter may modify,
                            cancel, terminate or suspend the promotion.
                        </li>
                        <li>
                            To the extent permitted by law, the Promoter is not
                            liable for any loss, damage or injury whatsoever
                            (including, but not limited to, indirect or
                            consequential loss) resulting from this promotion,
                            including the taking of prizes.
                        </li>
                        <li>
                            If, for any reason, this promotion is not capable of
                            running as planned, including war, terrorism, state
                            of emergency or disaster, infection by computer
                            virus, bugs, tampering, unauthorised intervention,
                            fraud, technical failures, or any other causes
                            beyond the control of the Promoter which corrupt or
                            affect the administration, security, fairness,
                            integrity, or proper conduct of this promotion, the
                            Promoter reserves the right in its sole discretion
                            to cancel, terminate, modify or suspend the
                            promotion.
                        </li>
                        <li>
                            All costs associated with entering the promotion are
                            your responsibility.
                        </li>
                        <li>
                            You acknowledge that the promotion is in no way
                            sponsored, endorsed, administered by or associated
                            with Facebook, Twitter or any other social media
                            platform.
                        </li>
                        <li>
                            You acknowledge that any information that you
                            provide in connection with this promotion is
                            provided to the Promoter and not to Facebook,
                            Twitter or other social media platform.
                        </li>
                        <li>
                            You must release Facebook, Twitter and other social
                            media platforms and their associated companies from
                            all liability arising in respect of the promotion.
                        </li>
                        <li>
                            You understand and agree that the Promoter may
                            collect personal information from you when you enter
                            the promotion, and use it for the purpose of running
                            the promotion (which may include disclosure to third
                            parties for the purpose of processing and conducting
                            the promotion), for promotional purposes surrounding
                            this promotion, as well as other purposes, as set
                            out in the Promoter’s Privacy Policy (located at{' '}
                            <a href="https://policies.uq.edu.au/document/view-current.php?id=4">
                                https://policies.uq.edu.au/document/view-current.php?id=4
                            </a>
                            ). For further information on how the Promoter deals
                            with your personal information, please refer to the
                            Promoter’s Privacy Policy.
                        </li>
                    </ol>
                    <p>
                        {messages.formatMessage({
                            id: 'T&CParagraph95',
                        })}
                    </p>
                </div>
            </div>
            <Footer pageAnalitycsId="terms-and-conditions-page" />
        </div>
    );
}
export default TermsAndConditions;
