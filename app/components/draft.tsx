// {
//   /* Bottom message - Improved */
// }
// <motion.div
//   initial={{ opacity: 0, y: 30 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   transition={{ delay: 1, duration: 0.8 }}
//   className="text-center"
// >
//   <motion.div
//     animate={{
//       scale: [1, 1.05, 1],
//     }}
//     transition={{
//       duration: 2,
//       repeat: Infinity,
//       repeatType: "reverse",
//     }}
//     className="mb-8"
//   >
//     <p className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
//       You already said YES! 💕
//     </p>
//     <p className="text-xl text-gray-700">Now let's make every moment count</p>
//   </motion.div>

//   {/* Back to top button */}
//   <motion.button
//     whileHover={{ scale: 1.05, y: -5 }}
//     whileTap={{ scale: 0.95 }}
//     onClick={handleBackToTop}
//     className="group px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-red-300 transition-all relative overflow-hidden"
//   >
//     <span className="relative z-10 flex items-center gap-2">From the top?</span>
//     {/* Shine effect */}
//     <motion.div
//       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//       animate={{
//         x: ["-100%", "200%"],
//       }}
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         repeatDelay: 1,
//       }}
//     />
//   </motion.button>

//   {/* Final message */}
//   <motion.div
//     initial={{ opacity: 0 }}
//     whileInView={{ opacity: 1 }}
//     viewport={{ once: true }}
//     transition={{ delay: 1.5, duration: 1 }}
//     className="mt-12"
//   >
//     <motion.div
//       animate={{
//         scale: [1, 1.2, 1],
//       }}
//       transition={{
//         duration: 1.5,
//         repeat: Infinity,
//         repeatType: "loop",
//       }}
//       className="text-6xl mb-4"
//     >
//       ❤️
//     </motion.div>
//     <p className="text-gray-600 italic text-lg">
//       Yours for as long as you want me 💝
//     </p>
//   </motion.div>
// </motion.div>;
