import { useState } from "react";

const CardShower = () => {
    const [stopScroll, setStopScroll] = useState(false);
    const cardData = [
        {
           
            image: "https://images.unsplash.com/photo-1638896171606-afd4df813d81?w=600&auto=format&fit=crop&q=60",
        },
        {
            
            image: "https://plus.unsplash.com/premium_photo-1673853725302-3bb17aecd303?w=600&auto=format&fit=crop&q=60",
        },
        {
           
            image: "https://images.unsplash.com/photo-1690702692247-94470ff62017?w=600&auto=format&fit=crop&q=60",
        },
        {
           
            image: "https://plus.unsplash.com/premium_photo-1714226830845-63a7c6e434d8?w=600&auto=format&fit=crop&q=60",
        },
         {
            
            image: "https://images.unsplash.com/photo-1706977470443-e71503f38c1d?w=600&auto=format&fit=crop&q=60",
        },
         {
          
            image: "https://images.unsplash.com/photo-1568233399101-dac61bff10f1?w=600&auto=format&fit=crop&q=60",
        },
                 {
       
            image: "https://images.unsplash.com/photo-1598283000505-3c51fc6090ff?w=600&auto=format&fit=crop&q=60",
        },
    ];

    return (
        <>


            <div className="overflow-hidden w-full relative my-30 mx-auto max-w-[95%]" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none " />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <div key={index} className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300">
                                <img src={card.image} alt="card" className="w-full h-full object-cover rounded-md  " />
                                
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none t" />
            </div>
        </>
    );
};

export default CardShower;