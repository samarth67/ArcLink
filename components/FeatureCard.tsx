import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function FeatureCard({
  title,
  description,
  href,
}: Props) {

  const data: any = {
    "Payment Links": {
      icon: "🔗",
      bottom: "Fast. Simple. Secure."
    },

    "Wallet Identity": {
      icon: "🛡️",
      bottom: "Verified. Private. Yours."
    },

    "Explorer": {
      icon: "🔍",
      bottom: "Transparent. Real-time. Open."
    },

    "Faucet": {
      icon: "⚡",
      bottom: "Free. Instant. Unlimited."
    },
  };


  const item = data[title] || {
    icon: "✨",
    bottom: "Powered by Arc"
  };


  return (

    <Link href={href}>

      <div
        className="
        group relative overflow-hidden
        rounded-3xl
        border border-zinc-800
        bg-gradient-to-br from-zinc-900/80 to-black
        p-8
        transition-all duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]
        cursor-pointer
        "
      >

        {/* Glow */}
        <div className="
          absolute -top-20 -right-20
          h-40 w-40
          rounded-full
          bg-blue-500/10
          blur-3xl
          group-hover:bg-blue-500/20
          transition
        " />


        {/* Icon */}
        <div
          className="
          relative
          flex h-16 w-16
          items-center justify-center
          rounded-2xl
          bg-zinc-800
          text-3xl
          shadow-lg
          mb-8
          "
        >
          {item.icon}
        </div>


        {/* Title */}
        <h3 className="
          text-2xl
          font-bold
          text-white
        ">
          {title}
        </h3>


        {/* Description */}
        <p className="
          mt-4
          text-gray-400
          leading-relaxed
          text-sm
        ">
          {description}
        </p>



        {/* Bottom */}
        <div className="
          mt-8
          flex
          items-center
          justify-between
        ">

          <span className="
            text-sm
            text-blue-400
            font-medium
          ">
            ✦ {item.bottom}
          </span>


          <div className="
            h-10 w-10
            rounded-xl
            bg-zinc-800
            flex
            items-center
            justify-center
            text-white
            group-hover:bg-blue-600
            transition
          ">
            →
          </div>

        </div>


      </div>

    </Link>

  );
}