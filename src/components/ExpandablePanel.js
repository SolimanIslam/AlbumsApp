import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import Button from './Button';

function ExpandablePanel({ children, header }) {

    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    }

    let chevron = expanded ? <GoChevronLeft /> : <GoChevronDown />;

    return <div>
        <div
            className="border rounded mb-2.5  p-1 flex items-center justify-between bg-gray-50"
            
        >
            {header}
            <Button onClick={handleClick}>
                {chevron}
            </Button>
        </div>
        {expanded &&
            <div className="p-2 border-t">{children}</div>}
    </div>
}

export default ExpandablePanel;