import { useEffect, useState } from "react";

const SML = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [shouldCut, setShouldCut] = useState(false);

    useEffect(() => {
        setShouldCut(text.length > 30);
    }, [text]);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <p>
                {isExpanded || !shouldCut ? text : text.substring(0, 30)}
                {shouldCut && (
                    <span
                        className="text-[12px] truncate ml-[4px] text-white-800 hover:text-white-700 cursor-pointer"
                        onClick={handleClick}
                    >
                        {isExpanded ? "Show Less" : "Show More"}
                    </span>
                )}
            </p>
        </>
    );
};
export default SML;