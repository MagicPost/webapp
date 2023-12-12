export default function cuocphi() {
    return (
        <div>
            <div className="absolute top-20 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
    //   className="[
    //     {'-right-[1500px] transition-all duration-300': navigatorTab == 'follow' },
    //     {'right-0 transition-all duration-300': navigatorTab == 'cost' },     
    //   ]"
    >
      <div className="w-[1100px] sm:text-xl flex flex-col sm: p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
        <div className="text-blue-400 mb-7 w-full text-left">Biểu phí dịch vụ </div>
        <div className="md:flex">
          <div className="md:w-[50%] ">
            <div className="">Địa chỉ lấy hàng: </div>
            <div>
              <input type="text" className="bg-gray-100 mt-2 md:w-[90%] w-full h-9 rounded-xl outline-none pl-4 text-sm sm:text-xl"
              placeholder="Vui lòng chọn" />
            </div>

            <div className="flex w-[90%] bg-gray-100 rounded-md">
              <div className="w-1/3">
                <button className="w-full">
                  <h4 className="text-center">Tỉnh / Thành Phố</h4>
                </button>
              </div>
              <div className="w-1/3">
                <button className="w-full">
                  <h4 className="text-center">Quận / Huyện</h4>
                </button>
              </div>
              <div className="w-1/3">
                <button className="w-full">
                  <h4 className="text-center">Phường / Xã</h4>
                </button>
              </div>
            </div>

            <div className="flex w-[90%] bg-gray-100">
              <div className="w-1/3">
                <option value=""></option>
              </div>
              <div className="w-1/3">
                <option value=""></option>
              </div>
              <div className="w-1/3">
                <option value=""></option>
              </div>
            </div>
          </div>
          <div className="md:w-[50%]">
            <div>Địa chỉ người nhận: </div>
            <input type="text" className="bg-gray-100 mt-2 w-full h-9 rounded-xl outline-none pl-4 text-sm sm:text-xl"
            placeholder="Vui lòng chọn"></input>
          </div>
        </div>

        <div className="md:flex mt-5">
          <div className="md:w-[50%]">
            <div className="md:w-full">Tổng khối lượng: </div>
            <div className="md:w-full mt-2">
              <div className="rounded-xl flex bg-gray-100 md:w-[90%] ">
                <input type="text" className="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl"
                placeholder="Vui lòng nhập thông tin" />
                <span className="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">KG</span>
              </div>
            </div> 
          </div>
          <div className="md:w-[50%]">
            <div>Kích thước đơn hàng: </div>
            <div className="flex md:w-full mt-2 justify-between">
              <div className="w-[30%] rounded-xl bg-gray-100 flex">
                <input type="text" className="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl" />
                <span className="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">CM</span>
              </div>
              <div className="w-[30%] rounded-xl bg-gray-100 flex">
                <input type="text" className="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl" />
                <span className="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">CM</span>
              </div>
              <div className="w-[30%] rounded-xl bg-gray-100 flex">
                <input type="text" className="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl" />
                <span className="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">CM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
            <input type="checkbox" />
            Tôi không biết cân nặng chính xác của bưu kiện 
          </div>
        <button className="bg-[#189ab4] h-10 w-[300px] sm:w-100 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold mt-7">
          Tính phí giao hàng 
        </button> 
        </div>
        </div>
        </div>
    )
    
}