import classNames from "classnames";

function ListPanel({ content, title, customButton, customButtonError, className, contentClassName }) {

    const classes = classNames('m-2 p-2 border', className);

    const contentClasses = classNames("mx-5 my-2.5",contentClassName);

    return (
        <div className={classes}>
            <div
                className="flex justify-between items-center"
            >
                {title}
                {customButton}
            </div>

            {customButtonError}

            <div className={contentClasses}>{content}</div>
        </div>)
}

export default ListPanel;
