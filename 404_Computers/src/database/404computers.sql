-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-12-2021 a las 22:28:47
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `404computers`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banners`
--

CREATE TABLE `banners` (
  `id` int(10) UNSIGNED NOT NULL,
  `image_Route` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `banners`
--

INSERT INTO `banners` (`id`, `image_Route`) VALUES
(1, 'benqbanner.png'),
(2, 'lenovobanner.jpg'),
(3, 'logitechbanner.jpg'),
(4, 'macbookbanner.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_products`
--

CREATE TABLE `cart_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `cart_Product` int(10) UNSIGNED NOT NULL,
  `user_ID` int(10) UNSIGNED DEFAULT NULL,
  `cart_Quantity` int(10) UNSIGNED DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cart_products`
--

INSERT INTO `cart_products` (`id`, `cart_Product`, `user_ID`, `cart_Quantity`) VALUES
(63, 30, 15, 1),
(64, 11, 15, 1),
(65, 22, 23, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_Name` varchar(100) NOT NULL,
  `category_Link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `category_Name`, `category_Link`) VALUES
(1, 'Hardware', 'hardware'),
(2, 'Gaming', 'gaming'),
(3, 'Oficina', 'oficina'),
(4, 'Hogar', 'hogar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites`
--

CREATE TABLE `favorites` (
  `id` int(10) UNSIGNED NOT NULL,
  `favorite_Product` int(10) UNSIGNED NOT NULL,
  `user_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `favorites`
--

INSERT INTO `favorites` (`id`, `favorite_Product`, `user_ID`) VALUES
(61, 27, 15),
(62, 22, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history_products`
--

CREATE TABLE `history_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_ID` int(10) UNSIGNED NOT NULL,
  `product_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `history_products`
--

INSERT INTO `history_products` (`id`, `user_ID`, `product_ID`) VALUES
(121, 15, 2),
(122, 15, 31),
(123, 15, 8),
(124, 15, 25),
(125, 15, 18),
(126, 15, 30),
(127, 15, 28),
(128, 15, 14),
(129, 15, 27),
(130, 15, 6),
(131, 18, 6),
(132, 15, 11),
(133, 23, 22),
(134, 24, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `color` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL,
  `price` decimal(10,0) NOT NULL DEFAULT 0,
  `finalPrice` decimal(10,0) NOT NULL DEFAULT 0,
  `stock` int(10) UNSIGNED DEFAULT 1,
  `discount` int(10) UNSIGNED DEFAULT 0,
  `onSale` int(1) UNSIGNED DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 DEFAULT NULL,
  `product_Category` int(10) UNSIGNED DEFAULT NULL,
  `product_Subcategory` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `color`, `price`, `finalPrice`, `stock`, `discount`, `onSale`, `description`, `product_Category`, `product_Subcategory`) VALUES
(1, 'Notebook Lenovo 14P 4GB RAM', 'Negro', '88000', '70400', 16, 20, 0, 'La notebook Lenovo IdeaPad 1 fue pensada para hacer tu vida más sencilla. Su diseño elegante e innovador y su comodidad para transportarla, la convertirá en tu PC favorita. Cualquier tarea que te propongas, ya sea en casa o en la oficina, la harás con facilidad gracias a su poderoso rendimiento.', 2, 21),
(2, 'Notebook Macbook Air M1', 'Gris', '178000', '142400', 5, 20, 0, 'Chip M1 de Apple que permite un gran avance en el rendimiento del CPU, GPU y aprendizaje automático.', 3, 21),
(3, 'Monitor Benq 27 2k Sw2700pt', 'Negro', '250000', '175000', 23, 30, 1, '- El sistema para el cuidado de la vista Eye-care™ de BenQ, cuenta con tecnologías que reducen el cansancio en los ojos, evitando la fatiga visual y aumenta la comodidad y productividad del usuario.', 2, 8),
(4, 'Impresora HP LaserJet 137fnw', 'Blanco', '58000', '58000', 13, 0, 0, 'HP provee las impresoras más seguras del mundo. Con ellas, conseguirás proteger tu información, obtener lo máximo en tecnología y un rendimiento impresionante que se adaptará a cualquier reto que tengas. Sin dudas, esta máquina es ideal para cumplir, de forma eficiente, la meta que te propongas.', 3, 15),
(5, 'Logitech Master Series MX Master Mouse', 'Negro', '9000', '9000', 23, 0, 0, 'Logitech diseña productos y experiencias que ocupan un lugar cotidiano en la vida de las personas, poniendo foco en la innovación y la calidad. Su objetivo es crear momentos verdaderamente únicos y significativos para sus usuarios. Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. Sin necesidad de mover el brazo para deslizar el cursor, tu mano se fatigará menos. Son ideales para cualquier espacio de trabajo y quienes tienen la mesa llena de diversos objetos.', 2, 10),
(6, 'Notebook Asus Vivobook R564JA', 'Gris', '75000', '67500', 20, 10, 1, 'Disfrutá de la perfecta combinación de rendimiento y diseño con esta notebook Asus VivoBook R564JA. Encontrarás en ella una excelente herramienta para tus trabajos de todos los días y para tus momentos de entretenimiento. Aprovechá la experiencia extraordinaria que la marca tiene para ofrecerte y optimizá la calidad de tus imágenes y videos.', 3, 21),
(7, 'Monitor LG 22MK600M', 'Negro', '19000', '19000', 23, 0, 0, 'LG busca entender a los usuarios para ofrecerles óptimas soluciones y nuevas experiencias a través de la evolución tecnológica. Disfrutá de la perfecta combinación de diseño, calidad y rendimiento que la empresa te ofrece en este monitor.', 2, 8),
(8, 'Auriculares Logitech Headset H390 USB', 'Gris', '3000', '2700', 8, 10, 1, 'En la calle, en el colectivo o en la oficina, tené siempre a mano tus auriculares Logitech y ¡escapate de la rutina por un rato! Vas a poder disfrutar de la música que más te gusta y de tus podcasts favoritos cuando quieras y donde quieras.', 2, 11),
(9, 'Procesador Intel Core i5-10400', 'Gris', '29000', '29000', 14, 0, 0, 'Productividad y entretenimiento, todo disponible en tu computadora de escritorio. La superioridad tecnológica de INTEL es un beneficio para todo tipo de profesionales. Asegura el mejor rendimiento de las aplicaciones, de la transferencia de datos y la conexión con otros elementos tecnológicos.', 1, 2),
(10, 'Consola Sony Playstation 5 825gb Digital', 'Blanco', '110000', '110000', 8, 0, 0, 'Con tu consola PlayStation 5 tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.', 2, 13),
(11, 'Router MikroTik RB750Gr3', 'Negro', '8500', '8500', 3, 0, 1, 'Hex es un Router Gigabit Ethernet de cinco puertos para lugares donde no se requiere conectividad inalámbrica. El dispositivo tiene un puerto USB de tamaño completo. Esta nueva revisión actualizada del hex trae varias mejoras en el rendimiento. Es asequible, pequeño y fácil de usar, pero al mismo tiempo, viene con un muy potente doble núcleo 880MHz CPU y 256 MB de RAM, capaz de todas las configuraciones avanzadas que RouterOS apoya. Cifrado IPsec hardware (~ 470 Mbps) y el paquete de servidor tipo es compatible, ranura microSD en que también proporciona una mayor velocidad r / w para el almacenamiento de base de datos en la tarjeta microSD.', 3, 19),
(12, 'Router TP-Link C58HP', 'Blanco', '6200', '4650', 52, 25, 0, 'Conectividad que te acompaña TP Link es sinónimo de estabilidad, rendimiento y valor, ya que es el proveedor número 1 de dispositivos wifi con distribución en más de 170 países. Este modelo C58HP te permitirá crear redes de gran velocidad e integrar todos los aparatos electrónicos inteligentes para que disfrutes de la mejor conexión sin interrupciones. Información que vuela Sin importar la cantidad de artefactos conectados ni la magnitud de los datos, tu conexión será impresionante. Con una velocidad de 1317 Mbps, los tiempos de cargas lentas quedaron atrás. Gran alcance y estabilidad ¡Mantenete siempre en línea! Con su doble banda lográ un mayor alcance y una mejor estabilidad de la frecuencia.', 3, 19),
(13, 'PowerLine TP-Link TL-WPA4220', 'Blanco', '5100', '2550', 41, 50, 0, 'Wifi en todas partes El adaptador Powerline TP-Link TL-WPA4220 te permitirá llevar Internet a aquellas zonas a donde el router no llegue. Es ideal para viviendas u oficinas con varias plantas y sitios con varios dispositivos funcionando a la vez. Vas a alcanzar la señal estable y segura que necesitás. Más velocidad Si lo que necesitás es un equipo que te permita realizar tus tareas diarias sin demoras, con una velocidad de 300 Mbps este dispositivo es perfecto para vos. Internet en todos lados Con una banda de 2.4 Hz, el alcance de la señal será excelente para que puedas utilizar tus aparatos electrónicos en cualquier parte.', 3, 19),
(14, 'Fuente Thermaltake 600w', 'Negro', '11300', '11300', 21, 0, 1, '• Marca: Thermaltake • Modelo: SPD-0600P • Tipo: Intel ATX 12V 2.3 • Maxima Capacidad de salida: 600W • Color: Negro • Dimensiones (H x W x D): 86 mm x 150 mm x 140 mm • Corriente de entrada: 10A max • Rango de frecuencia de entrada:50 Hz - 60 Hz • Sistema de refrigeración Ventilador de 120 mm: 1800 R.P.M. ± 10% • Eficiencia: 82-86% de eficiencia @ 20-100% de carga • MTBF: 100.000 horas mínimo • Aprobación de seguridad: CE / CB / TUV / UL / FCC • Conector PCI-E: PCI-E 6 + 2 pines x 2', 1, 7),
(15, 'NVIDIA GT 1030 2GD4', 'Negro', '21000', '15750', 14, 25, 0, 'Nvidia es el fabricante líder de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor gráfico de tu computadora. Además, sus procesadores usan tecnología de punta para que puedas disfrutar de un producto veloz y duradero. Velocidad en cada lectura Como cuenta con 384 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.', 1, 6),
(16, 'Gigabyte GP-GSTFS31240GNTD 240GB', 'Negro', '4500', '4500', 12, 0, 0, 'Con la unidad en estado sólido Gigabyte vas a incrementar la capacidad de respuesta de tu equipo. Gracias a esta tecnología podrás invertir en velocidad y eficiencia para el inicio, la carga y la transferencia de datos. Irrompible Además de su funcionalidad y soporte, la importancia de los discos de almacenamiento también radica en su calidad y resistencia. Despreocupate y disfrutá de la durabilidad de este producto debido a su capacidad de absorber y resistir fuertes impactos. Más velocidad a tu alcance Este producto posee una interfaz SATA III que se encarga de transferir datos con la placa madre de tu computadora. Es de gran importancia y con su velocidad de envío de información mejora el rendimiento. Vas a poder cargar todo tipo de archivos en tu PC con rapidez.', 1, 4),
(17, 'Seagate Barracuda ST1000DM010 1TB', 'Negro', '5100', '4590', 7, 10, 1, 'Especificaciones técnicas: • Marca : Seagate • Línea : BarraCuda • Modelo : Barracuda • Versión : ST1000DM010 •PN : 2EP102-300 • Capacidad : 1 TB • Modelo detallado : HDS-ST1000DM010 • Tecnología interna : HDD • Interfaces : SATA III • Aplicaciones : PC • Ubicación del disco : Interno • Tipo de disco externo : Interno • Factor de forma : 3.5 in • Caché de datos : 64 GB • Velocidad de rotación : 7.2 rpm • Velocidad de transferencia : 530 MB/s • Latencia promedio : 4.16 ms • Sistema de archivos admitido : PC/Windows', 1, 5),
(18, 'Crucial Ram 8gb CT8G4DFS8266', 'Verde', '5300', '5300', 8, 0, 1, 'Una actualización de memoria es una de las formas más rápidas, fáciles y económicas de mejorar de manera inmediata el rendimiento de tu computadora. Ya sea para un ordenador portátil, de escritorio o una estación de trabajo que funciona lento y relentiza tus actividades, instalar más memoria tomará solo unos minutos y te brindará soluciones inmediatas y duraderas a corto, mediano y largo plazo. Acelerá y extendé la vida útil del sistema y aprovechá la capacidad de respuesta que te da para trabajar de manera simple y confortable. No lo dudes más, la memoria Crucial es una de las formas más accesibles para aumentar de manera fácil la capacidad multitarea de tu computadora. Adaptada a tus necesidades Su capacidad de 8 GB distribuída en módulos de 1 x 8 GB hace de esta memoria un soporte ideal para trabajos con documentos de alta complejidad, navegación en la web con múltiples pestañas, juegos, contenidos multimedia, entre otros. Potenciá tu PC Con su tecnología DDR4, mejorará el desempeño de tu equipo, ya que opera en 3 y 4 canales, generando mayor fluidez y velocidad en la transferencia de datos. ¡Optimizá al máximo el rendimiento de tu ordenador! Tu equipo como nuevo Esta memoria es ideal para tu Computadoras de escritorio. ¡Instalala y comenzá a disfrutar de un óptimo funcionamiento! Velocidad para exigentes Si sos fanático de los juegos en línea o la usás para trabajar con programas o aplicaciones pesadas, esta memoria es para vos. Gracias a su velocidad de 2666 MHz, podrás disfrutar de un alto rendimiento y hacer tus trabajos de manera rápida y efectiva.', 1, 1),
(19, 'Motherboard Asus Prime H310m E', 'Negro', '8200', '5740', 14, 30, 0, 'ACERCA DE ÉSTE PRODUCTO: Las tarjetas madre ASUS Prime Serie 300 proporcionan la base sólida necesaria para tu armado, además de la flexibilidad para actualizarla en un futuro. Hemos añadido todas las características de los procesadores Core Intel de octava generación con diseño e ingeniería de ASUS, incluye ajuste automático del sistema y refrigeración integral como controles y audio inmersivo. Cuando armas tu equipo con una tarjeta madre ASUS Prime Serie 300, construyes de forma inteligente, fácil y asequible. Intel ® H310 es un diseño de chips individual que admite procesadores Intel® Core ™ LGA1151 de octava generación. Proporciona un rendimiento mejorado al utilizar enlaces punto a punto en serie, lo que permite un mayor ancho de banda y estabilidad. Además, el chipset H310 proporciona un máximo de cuatro puertos USB 3.1 Gen 1, cuatro puertos SATA de 6 Gbps, 10 Gbps en M.2 y soporte para PCIe 2.0. Intel H310 también es compatible con gráficos integrados, por lo que disfrutará de lo último en rendimiento de gráficos. LISTA PARA LA 9ª y 8ª GENERACIÓN DE PROCESADORES INTEL® CORE™, PENTIUM® GOLD Y CELERON® DE SOCKET 1151 Esta tarjeta madre es compatible con procesadores Intel® Core™, Pentium® Gold y Celeron® de 8ª y 9ª generación de Socket1151, con gráficos integrados, memoria y controladores PCI Express para proporcionar salida de video integrado en la tarjeta mediante chipsets dedicados, memoria DDR4 dual-channel (2-DIMM) y 16x PCI Express 3.0/2.0 para un gran rendimiento. //////////////////////////////////////////////////////////////// CARACTERÍSTICAS: - Tipo de motherboard Micro ATX - Socket Intel 1151 V.2 - Chipset Intel H310 - Tipo de memoria DDR4 - Puertos DIMM 2 - Ram maxima 32GB - Puertos D-Sub 1 - Puertos HDMI 1 - LAN 10/100/1000 - Puertos PCI Express x1 2 - Puertos PCI Express x16 1 - Puertos M.2 1 - Puertos SATA 4 - USB 2.0 6 - USB 3.1 4', 1, 3),
(20, 'TV Smart TCL 32 L32S60A', 'Negro', '35200', '35200', 15, 0, 0, 'TCL es una de las empresas líderes en la industria global de televisores, dedicada a la investigación y desarrollo de productos electrónicos. Orientada a la satisfacción de sus clientes, se distingue por proveer una excelente experiencia a quienes adquieran y usen sus diferentes líneas de electrodomésticos. Con el Smart TV L32S60A vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos. Sumergite en la pantalla Su resolución HD presenta imágenes con gran detalle y alta definición. Ahora todo lo que veas cobrará vida con brillo y colores más reales. Un sonido que te envuelve Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos van a cobrar otro significado. Más allá de ver televisión Su función Screen Share permite duplicar la pantalla de tu smartphone, tablet o PC para que aparezca en la TV. De esta forma vas a poder visualizar todo tipo de contenido: material audiovisual, documentos de trabajo, correos electrónicos y más.', 4, 22),
(21, 'TP-Link RE200', 'Blanco', '2300', '2300', 22, 0, 0, 'Potenciá tu wifi Si tu router no alcanza a cubrir los ambientes donde necesitás internet, un repetidor como el TP-Link RE200 es la solución. Su doble banda de hasta 750 Mbps te permiten expandir la señal hasta 185 m2. Contenidos que vuelan Su alta velocidad es ideal para ver videos en HD, jugar en línea y descargar contenido, entre otras tareas que necesitan un uso intensivo del ancho de banda. Diseño práctico y compacto Este repetidor de tamaño miniatura se enchufa en la pared para que puedas extender la señal de wifi con solo presionar un botón.', 4, 23),
(22, 'Tablet Samsung Galaxy Tab A7 SM-T500 10.4\'', 'Negro', '29000', '26100', 24, 10, 1, 'Esta tablet Samsung es la compañera ideal, con capacidad de sobra para cada una de tus actividades. El diseño delgado, compacto y portátil, con facilidad para sostener en una mano, lo convierte en una combinación perfecta de rendimiento y versatilidad. Transferir, sincronizar y acceder a tus dispositivos las veces que quieras ahora es posible. Sus conexiones bluetooth, wi-fi, wi-fi direct, usb-c te permiten potenciar sus funciones al máximo. Gracias a su cámara principal de 8 Mpx y frontal de 5 Mpx, podrás hacer videollamadas o sacarte fotos en cualquier momento y lugar, con una excelente calidad de imagen. Nitidez, brillo y colores vibrantes harán que tus experiencias se reflejen de manera óptima.', 4, 24),
(23, 'Cargador Anker', 'Blanco', '7000', '7000', 33, 0, 0, 'Increíblemente pequeño: el diseño ultra compacto es de solo 1.0 in de grosor, con 18 W de potencia en un paquete del tamaño de un cargador de iPhone de 5 W.', 4, 26),
(24, 'Parlantes Thonet & Vander Vertrag BT', 'Negro', '27000', '27000', 16, 0, 0, 'Thonet & Vander Vertrag BT ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Versátil y funcional Disfrutar de un amplio espectro de sonidos, incluso de baja frecuencia es posible con este parlante tweeter, woofer, subwoofer. Vas a sentir la diferencia en la calidad sonora excelente. Versátil y funcional Disfrutar de un amplio espectro de sonidos, incluso los más agudos es posible con este parlante tweeter, woofer, subwoofer. Vas a sentir la diferencia en la calidad sonora excelente.', 4, 27),
(25, 'Mochila Notebook Urbana', 'Gris', '4200', '3150', 39, 25, 1, 'Mochila para Notebook de 15 pulgadas', 4, 28),
(26, 'Webcam Logitech C505', 'Gris', '5100', '3060', 41, 40, 0, 'Vaya más allá de los componentes ópticos integrados en los portátiles con la cámara Web C505 que ofrece vídeo colorido, nítido y fluido con formato panorámico HD 720p, ángulo de visión diagonal de 60°, foco fijo y corrección de iluminación automática. Y además ofrecerá un sonido estupendo gracias a un micrófono omnidireccional que garantiza una conversación clara y natural hasta a 3 metros de distancia.', 3, 18),
(27, 'Aro de Luz', 'Negro', '1900', '570', 67, 70, 1, 'Aro de Luz 3 tonos a USB', 3, 20),
(28, 'Soporte para Notebook', 'Gris', '1100', '880', 59, 20, 0, 'Soporte para notebooks de 10 a 17 Pulgadas', 3, 17),
(29, 'Silla Ergonomica', 'Negro', '36000', '36000', 47, 0, 0, 'Silla Ergonomica para Oficina', 3, 16),
(30, 'Micrófono Blue Snowball Ice', 'Blanco', '6200', '6200', 23, 0, 1, 'La comunicación clara y poderosa es importante para todas las organizaciones. Los micrófonos de Blue te permiten capturar y transmitir con una calidad de sonido sorprendente. Blue combina audio de calidad profesional con la simplicidad plug-and-play para ofrecer un rendimiento que está a años luz de los micrófonos integrados para portátiles y cámaras. Fiel reflejo de la realidad Ideal para varias actividades. Te brindará un sonido de calidad y conseguirás la nitidez de las voces. Un formato a tu medida Al ser condensador, posibilitará un resultado claro y fino. Es ideal para percusiones, guitarras, pianos, entre otros. Por su respuesta tan definida ante la voz, es el más elegido por los profesionales. Diseño eficaz Su patrón polar cardioide ofrece una mayor sensibilidad hacia los sonidos frontales, y así evita los ruidos provenientes de la parte posterior.', 2, 14),
(31, 'Teclado Logitech K780 QWERTY', 'Negro', '7600', '7600', 62, 0, 1, 'El teclado K780 Multi-Device para ordenador ofrece todo lo necesario y tambiénfunciona con smartphones y tablets. La escritura es cómoda y silenciosa, y se puedealternar entre los dispositivos utilizados para introducir texto. Funciona con Windows,Mac, Chrome OS, Android y iOS.', 3, 9),
(32, 'Joystick Logitech Extreme 3D Pro', 'Negro', '6200', '6200', 13, 0, 0, 'Control preciso Este mando combina funciones revolucionarias mientras conserva precisión, comodidad y exactitud en cada movimiento. Gracias a su ergonomía especialmente pensada para la posición de tu mano, podés pasar horas jugando con total confort.', 2, 12),
(43, 'SSD 512GB ADATA M.2 NVME ADATA FALCON', 'Blanco', '8798', '8798', 4, 0, 0, 'SSD M2', 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_images`
--

CREATE TABLE `product_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `image_Route` varchar(200) DEFAULT NULL,
  `product_Id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `product_images`
--

INSERT INTO `product_images` (`id`, `image_Route`, `product_Id`) VALUES
(1, 'notebook_A.jpg', 1),
(2, 'notebook_B.jpg', 1),
(3, 'notebook_C.jpg', 1),
(4, 'notebook_D.jpg', 1),
(5, 'macbookairm1.jpg', 2),
(6, 'macbookairm12.jpg', 2),
(7, 'macbookairm13.jpg', 2),
(8, 'macbookairm14.jpg', 2),
(9, 'benqmonitor1.jpg', 3),
(10, 'benqmonitor2.jpg', 3),
(11, 'benqmonitor3.jpg', 3),
(12, 'benqmonitor4.jpg', 3),
(13, 'impresorahp1.jpg', 4),
(14, 'impresorahp2.jpg', 4),
(15, 'impresorahp3.jpg', 4),
(16, 'impresorahp4.jpg', 4),
(17, 'logitechmx1.jpg', 5),
(18, 'logitechmx2.jpg', 5),
(19, 'logitechmx3.jpg', 5),
(20, 'logitechmx4.jpg', 5),
(21, 'asusvivobook1.webp', 6),
(22, 'asusvivobook2.webp', 6),
(23, 'asusvivobook3.webp', 6),
(24, 'asusvivobook4.webp', 6),
(25, 'lgmonitor221.webp', 7),
(26, 'lgmonitor222.webp', 7),
(27, 'lgmonitor223.webp', 7),
(28, 'lgmonitor222.webp', 7),
(29, 'logitechauricular1.webp', 8),
(30, 'logitechauricular2.webp', 8),
(31, 'logitechauricular3.webp', 8),
(32, 'logitechauricular4.webp', 8),
(33, 'inteli51.webp', 9),
(34, 'inteli52.webp', 9),
(35, 'inteli53.webp', 9),
(36, 'ps51.webp', 10),
(37, 'ps52.webp', 10),
(38, 'ps53.webp', 10),
(39, 'ps54.webp', 10),
(40, 'mirkotikrouter1.webp', 11),
(41, 'mirkotikrouter2.webp', 11),
(42, 'mirkotikrouter3.webp', 11),
(43, 'tplinkc581.webp', 12),
(45, 'tplinkc582.webp', 12),
(46, 'tplinkc583.webp', 12),
(47, 'tplink42201.webp', 13),
(48, 'tplink42202.webp', 13),
(49, 'tplink42203.webp', 13),
(50, 'ther6001.webp', 14),
(51, 'ther6002.webp', 14),
(52, 'ther6003.webp', 14),
(53, '10301.webp', 15),
(54, '10302.webp', 15),
(55, '10303.webp', 15),
(56, '10304.webp', 15),
(57, 'ssd1.webp', 16),
(58, 'ssd2.webp', 16),
(59, 'ssd3.webp', 16),
(60, 'hdd1.webp', 17),
(61, 'hdd2.webp', 17),
(62, 'ram1.webp', 18),
(63, 'ram2.webp', 18),
(64, 'ram3.webp', 18),
(65, 'mother1.webp', 19),
(66, 'mother2.webp', 19),
(67, 'mother3.webp', 19),
(68, 'tcl1.webp', 20),
(69, 'tcl2.webp', 20),
(70, 'tcl3.webp', 20),
(71, 'tcl4.webp', 20),
(72, 're2001.webp', 21),
(73, 're2002.webp', 21),
(74, 're2003.webp', 21),
(75, 'tab1.webp', 22),
(76, 'tab2.webp', 22),
(77, 'tab3.webp', 22),
(78, 'tab4.webp', 22),
(79, 'anker1.webp', 23),
(80, 'anker2.webp', 23),
(81, 'anker3.webp', 23),
(82, 'anker4.webp', 23),
(83, 'thonet1.webp', 24),
(84, 'thonet2.webp', 24),
(85, 'thonet3.webp', 24),
(86, 'mochila1.webp', 25),
(87, 'mochila2.webp', 25),
(88, 'mochila3.webp', 25),
(89, 'webcam1.webp', 26),
(90, 'webcam2.webp', 26),
(91, 'webcam3.webp', 26),
(92, 'aro1.webp', 27),
(93, 'aro2.webp', 27),
(94, 'aro3.webp', 27),
(95, 'aro4.webp', 27),
(96, 'soporte1.webp', 28),
(97, 'soporte2.webp', 28),
(98, 'soporte3.webp', 28),
(99, 'silla1.webp', 29),
(100, 'silla2.webp', 29),
(101, 'silla3.webp', 29),
(102, 'silla4.webp', 29),
(103, 'microfono1.webp', 30),
(104, 'microfono2.webp', 30),
(105, 'microfono3.webp', 30),
(106, 'teclado1.webp', 31),
(107, 'teclado2.webp', 31),
(108, 'teclado3.webp', 31),
(109, 'teclado4.webp', 31),
(111, 'joystick2.webp', 32),
(151, '1637606601984_img_.webp', 32),
(152, '1637606633219_img_.webp', 32),
(164, '1638225004282_img_.jpg', 43),
(165, '1638225004283_img_.jpg', 43);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase`
--

CREATE TABLE `purchase` (
  `id` int(10) UNSIGNED NOT NULL,
  `buyer_ID` int(10) UNSIGNED DEFAULT NULL,
  `item_ID` int(10) UNSIGNED DEFAULT NULL,
  `item_Price` int(10) UNSIGNED DEFAULT NULL,
  `item_Quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `order_ID` int(10) UNSIGNED DEFAULT NULL,
  `payment_Option` int(10) UNSIGNED DEFAULT NULL,
  `item_Name` varchar(200) DEFAULT NULL,
  `nameCard` varchar(200) DEFAULT '',
  `cardNumber` varchar(200) DEFAULT '',
  `yearCard` int(10) UNSIGNED DEFAULT 0,
  `cvvCard` int(10) UNSIGNED DEFAULT 0,
  `monthCard` int(10) UNSIGNED DEFAULT 0,
  `homeAddress` varchar(200) DEFAULT '',
  `cpCode` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `purchase`
--

INSERT INTO `purchase` (`id`, `buyer_ID`, `item_ID`, `item_Price`, `item_Quantity`, `order_ID`, `payment_Option`, `item_Name`, `nameCard`, `cardNumber`, `yearCard`, `cvvCard`, `monthCard`, `homeAddress`, `cpCode`) VALUES
(11, 15, 18, 5300, 1, 39, 1, 'Crucial Ram 8gb CT8G4DFS8266', '', '', 0, 0, 0, 'Direccion Falsa', '4343'),
(12, 15, 30, 6200, 1, 26, 3, 'Micrófono Blue Snowball Ice', '', '', 0, 0, 0, 'Direccion Falsa', '34234'),
(13, 15, 28, 880, 1, 107, 3, 'Soporte para Notebook', '', '', 0, 0, 0, 'Direccion Falsa', '3442'),
(14, 15, 14, 11300, 1, 92, 2, 'Fuente Thermaltake 600w', 'Alexander Mamani', '1111222233334444', 2028, 546, 12, 'Direccion Falsa', '1824'),
(15, 15, 2, 284800, 2, 66, 3, 'Notebook Macbook Air M1', '', '', 0, 0, 0, 'Direccion Falsa', '1653'),
(16, 15, 27, 1710, 3, 66, 3, 'Aro de Luz', '', '', 0, 0, 0, 'Direccion Falsa', '1653'),
(17, 18, 6, 135000, 2, 61, 3, 'Notebook Asus Vivobook R564JA', '', '', 0, 0, 0, 'casa', '424'),
(18, 15, 6, 202500, 3, 88, 2, 'Notebook Asus Vivobook R564JA', 'Alexander Mamani', '1111222233334444', 2024, 546, 4, 'P. de Rojas y Acevedo 619', '1824'),
(19, 15, 11, 8500, 1, 41, 3, 'Router MikroTik RB750Gr3', '', '', 0, 0, 0, 'casa', '3432'),
(20, 15, 30, 6200, 1, 19, 3, 'Micrófono Blue Snowball Ice', '', '', 0, 0, 0, 'casa', '4533');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(10) UNSIGNED NOT NULL,
  `subcategory_Name` varchar(100) NOT NULL,
  `subcategory_Link` varchar(100) NOT NULL,
  `category_Id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `subcategories`
--

INSERT INTO `subcategories` (`id`, `subcategory_Name`, `subcategory_Link`, `category_Id`) VALUES
(1, 'Memorias RAM', 'memorias-ram', 1),
(2, 'Procesadores', 'procesadores', 1),
(3, 'Motherboards', 'motherboards', 1),
(4, 'Discos SSD', 'discos-ssd', 1),
(5, 'Discos HDD', 'discos-hdd', 1),
(6, 'Placas de Video', 'placas-de-video', 1),
(7, 'Fuentes PSU', 'fuentes-psu', 1),
(8, 'Monitores', 'monitores', 2),
(9, 'Teclados', 'teclados', 2),
(10, 'Mouses', 'mouse', 2),
(11, 'Auriculares', 'auriculares', 2),
(12, 'Joysticks', 'joysticks', 2),
(13, 'Consolas', 'consolas', 2),
(14, 'Microfonos', 'microfonos', 2),
(15, 'Impresoras', 'impresoras', 3),
(16, 'Sillas', 'sillas', 3),
(17, 'Soportes', 'soportes', 3),
(18, 'Webcams', 'webcams', 3),
(19, 'Conectividad', 'conectividad', 3),
(20, 'Accesorios', 'accesorios', 3),
(21, 'Notebooks', 'notebooks', 3),
(22, 'Smarts TV', 'smarts-tv', 4),
(23, 'Repetidores', 'repetidores', 4),
(24, 'Tablets', 'tablets', 4),
(25, 'Cables', 'cables', 4),
(26, 'Cargadores', 'cargadores', 4),
(27, 'Parlantes', 'parlantes', 4),
(28, 'Mochilas', 'mochilas', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `dni` int(8) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `pass`, `role`, `image`, `address`, `phone`, `dni`, `province`, `city`) VALUES
(15, 'Alexander', 'Mamani', 'alex@gmail.com', '$2b$12$i4i1Qk73Dj7PuZK7cPzZQ.PtwcGFD6dvD52ISG5i3k8G8pYM5X97S', 'ROLE_USER', '1638234234196_img_.png', 'calle falsa 240z', 1199998888, 11999555, NULL, NULL),
(18, 'Sol', 'Rodriguez', 'sol@gmail.com', '$2b$12$tFXCGl0FOWs./8luPfzBVem7vP8GqLRjg/1T.nt8Bm09rCe0AJuPW', 'ROLE_ADMIN', '1638232446195_img_.png', 'Calle Falsa 123', 0, 0, NULL, NULL),
(19, 'Rodrigo', 'Quiroga', 'rodrigo@gmail.com', '$2b$12$2z7O2KjkdoMswLBCKHdk1uTAQPLw0JPUGJRdjAa3pJtDIsJiMTKwa', 'ROLE_ADMIN', 'user_default.jpg', 'calle falsa 456', 0, 0, NULL, NULL),
(22, 'admin', 'user', 'admin@gmail.com', '$2b$12$7XFGj9whDouLR.ovzXE.Te3n99n6rdkbS10chX.R6NRi3vkeIRqnK', 'ROLE_ADMIN', 'user_default.jpg', 'calle falsa 123', 0, 0, NULL, NULL),
(23, 'Super', 'Admin', 'super_admin@gmail.com', '$2b$12$aRDtQ6JaolHQbuC8yHlPrOdBr.Ux3N1W0Fc3xIYi0ETeSZuN0i.FG', 'ROLE_SUPER_ADMIN', 'user_default.jpg', 'calle 2424', 1144443333, 33342342, 'Catamarca', 'ACONQUIJA'),
(24, 'usuarie', 'normalll', 'normal@gmail.com', '$2b$12$uvZTPMSi.yLlHIJboJc6qORFWu2s.lzLOoGHpGXTNwN7ZyYeluc5i', 'ROLE_USER', 'user_default.jpg', '', NULL, NULL, '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_products_FK` (`user_ID`),
  ADD KEY `cart_products_FK_1` (`cart_Product`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_FK` (`user_ID`);

--
-- Indices de la tabla `history_products`
--
ALTER TABLE `history_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history_products_FK` (`user_ID`),
  ADD KEY `history_products_FK_1` (`product_ID`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_FK` (`product_Category`),
  ADD KEY `products_FK_1` (`product_Subcategory`);

--
-- Indices de la tabla `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_images_un` (`id`),
  ADD KEY `product_images_FK` (`product_Id`);

--
-- Indices de la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subcategories_FK` (`category_Id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `history_products`
--
ALTER TABLE `history_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT de la tabla `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_products`
--
ALTER TABLE `cart_products`
  ADD CONSTRAINT `cart_products_FK` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_products_FK_1` FOREIGN KEY (`cart_Product`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_FK` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `history_products`
--
ALTER TABLE `history_products`
  ADD CONSTRAINT `history_products_FK` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `history_products_FK_1` FOREIGN KEY (`product_ID`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_FK` FOREIGN KEY (`product_Category`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_FK_1` FOREIGN KEY (`product_Subcategory`) REFERENCES `subcategories` (`id`);

--
-- Filtros para la tabla `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_FK` FOREIGN KEY (`product_Id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_FK` FOREIGN KEY (`category_Id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
