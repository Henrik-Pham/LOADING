function ItemInfo({ image, alt, title, description }) {
    return (
        <div className="item-info-container">
            <img className="item-info-img" src={image} alt={alt} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
export default ItemInfo;
