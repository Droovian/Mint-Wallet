const NotFound = () => {
    return ( 
        <div className="w-full h-screen bg-black flex justify-center items-center">
            <div className="text-white p-4 flex flex-col border">
                <h2 className="text-3xl">Sorry, the Page you are looking for doesn't exist!</h2>
                <p className="text-red-400 mt-3 text-2xl">404 Error</p>
            </div>
        </div>
     );
}
 
export default NotFound;