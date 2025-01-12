import { useState } from 'react';
import Accordion from '../components/Accordion';

interface PodcastAccordion {
    title: string;
    duration: string;
    content: JSX.Element;
}

interface NestedAccordionsProps {
    accordionNestedItems: PodcastAccordion[];
}

function NestedAccordions({ accordionNestedItems }: NestedAccordionsProps) {
    const [activeContentIndex, setActiveContentIndex] = useState<number>(-1);
    return (
        <div>
            {accordionNestedItems.map((item, index: number) => {
                return (
                    <Accordion
                        key={index}
                        title={
                            <div>
                                <p className="font-omnes text-left text-xl my-0">
                                    {item.title}
                                </p>
                                <p className="font-forma text-left text-xs my-0">
                                    {item.duration}
                                </p>
                            </div>
                        }
                        content={
                            <div className="w-full bg-slate-200 p-4">
                                {accordionNestedItems[index].content}
                            </div>
                        }
                        index={index}
                        activeIndex={activeContentIndex}
                        setActiveIndex={setActiveContentIndex}
                    />
                );
            })}
        </div>
    );
}

export default NestedAccordions;
