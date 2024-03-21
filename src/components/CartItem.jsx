import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { id, title, image, price, quantity } = item;
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/*image*/}
        <Link to={`/product/${id}`}>
          <img src={image} alt="" className="max-w-[80px] " />
        </Link>

        <div className="w-full flex flex-col">
          {/* title an remove icon */}
          <div className="flex justify-between mb-2">
            {/* title */}
            <Link
              to={`/products/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            {/* remove icon */}
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* quantity */}
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              {/* minus quantity icon */}
              <div
                onClick={() => decreaseQuantity(id)}
                className="flex-1 flex justify-center items-center cursor-pointer h-full"
              >
                <IoMdRemove />
              </div>
              {/* quantity */}
              <div className="flex h-full justify-center items-center px-2">
                {quantity}
              </div>
              {/* add quantity icon */}
              <div
                onClick={() => increaseQuantity(id)}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item-price */}
            <div className="flex-1 flex items-center justify-around">
              $ {price}
            </div>
            {/* final-price */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(
              price * quantity
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
