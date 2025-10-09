import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ root: './public' }))

// Main page
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="hr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Taekwondo Klub Gusar - Omiš | Treninzi za Djecu i Odrasle</title>
    <meta name="description" content="Pridružite se Taekwondo klubu Gusar u Omišu! Nudimo stručne treninge za sve uzraste. Razvijte disciplinu, snagu i vještine samoobrane u poticajnom okruženju.">
    <meta name="keywords" content="taekwondo, tkd gusar, omiš, borilačke vještine, samoobrana, treninzi za djecu, taekwondo omiš, sport omiš, klub gusar">
    <meta name="author" content="Start Digital">
    
    <!-- Favicon -->
    <link rel="icon" href="https://page.gensparksite.com/v1/base64_upload/ba8005234c0b327e1d2c5dd432c715ec" type="image/x-icon">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'gusar-red': '#d9232d',
                        'gusar-blue': '#005daa',
                        'gusar-dark': '#111827',
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'gradient': 'gradient 15s ease infinite',
                    },
                    backgroundImage: {
                        'hero-gradient': 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
                    }
                }
            }
        }
    </script>

    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- AOS (Animate On Scroll) Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <style>
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
            overflow-x: hidden;
        }
        
        /* Custom animations */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .hero-section {
            background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.9) 50%, rgba(55, 65, 81, 0.85) 100%), 
                        url('https://page.gensparksite.com/v1/base64_upload/bc6b27667c417b07bc0134e188d50f7c');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(217, 35, 45, 0.1), rgba(0, 93, 170, 0.1));
            pointer-events: none;
        }

        .sticky-nav {
            position: sticky;
            top: 0;
            z-index: 50;
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(15px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
        }

        .nav-link {
            position: relative;
            color: #374151;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .nav-link:hover {
            color: #d9232d;
            transform: translateY(-1px);
        }
        .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 3px;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, #d9232d, #005daa);
            transition: width 0.3s ease;
            border-radius: 2px;
        }
        .nav-link:hover::after {
            width: 100%;
        }

        .btn-primary {
            background: linear-gradient(135deg, #d9232d 0%, #b91c25 100%);
            color: white;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 25px rgba(217, 35, 45, 0.3);
            position: relative;
            overflow: hidden;
        }
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        .btn-primary:hover::before {
            left: 100%;
        }
        .btn-primary:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 35px rgba(217, 35, 45, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #005daa 0%, #004b8d 100%);
            color: white;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 25px rgba(0, 93, 170, 0.3);
        }
        .btn-secondary:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 15px 35px rgba(0, 93, 170, 0.4);
        }

        .gallery-img {
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            filter: brightness(0.9) contrast(1.1);
        }
        .gallery-img:hover {
            transform: scale(1.08) rotate(1deg);
            filter: brightness(1) contrast(1.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.25);
            z-index: 10;
        }

        .benefit-card {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border-left: 4px solid transparent;
            background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
        }
        .benefit-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
            border-left-color: #d9232d;
            background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
        }

        .section-divider {
            background: linear-gradient(90deg, transparent, #d9232d, #005daa, transparent);
            height: 2px;
        }

        .floating-element {
            animation: float 6s ease-in-out infinite;
        }

        .stats-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .text-gradient {
            background: linear-gradient(135deg, #d9232d 0%, #005daa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .form-success {
            background: linear-gradient(135deg, #10b981 0%, #065f46 100%);
            color: white;
            padding: 1rem;
            border-radius: 0.75rem;
            margin-top: 1rem;
            text-align: center;
            font-weight: 600;
            display: none;
        }

        /* Mobile responsive improvements */
        @media (max-width: 768px) {
            .hero-section {
                background-attachment: scroll;
            }
        }
    </style>
</head>
<body class="text-gray-800 font-inter">

    <!-- Header & Navigation -->
    <header id="header" class="sticky-nav">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#home" class="flex items-center group">
                <img src="https://page.gensparksite.com/v1/base64_upload/ba8005234c0b327e1d2c5dd432c715ec" alt="Taekwondo Klub Gusar Logo" class="h-14 w-14 mr-3 transition-transform group-hover:scale-110">
                <span class="font-black text-2xl text-gusar-dark">TKD GUSAR</span>
            </a>
            <div class="hidden md:flex items-center space-x-8">
                <a href="#home" class="nav-link">Početna</a>
                <a href="#o-nama" class="nav-link">O nama</a>
                <a href="#treninzi" class="nav-link">Treninzi</a>
                <a href="#galerija" class="nav-link">Galerija</a>
                <a href="#kontakt" class="nav-link">Kontakt</a>
            </div>
            <a href="#kontakt" class="hidden md:block btn-primary py-3 px-6 rounded-full font-bold text-sm uppercase tracking-wider">Pridruži se</a>
            <button id="mobile-menu-button" class="md:hidden focus:outline-none">
                <i class="fas fa-bars text-2xl text-gusar-dark"></i>
            </button>
        </nav>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white py-4 shadow-lg">
            <a href="#home" class="block text-center py-3 text-gray-700 hover:bg-gray-100 transition-colors">Početna</a>
            <a href="#o-nama" class="block text-center py-3 text-gray-700 hover:bg-gray-100 transition-colors">O nama</a>
            <a href="#treninzi" class="block text-center py-3 text-gray-700 hover:bg-gray-100 transition-colors">Treninzi</a>
            <a href="#galerija" class="block text-center py-3 text-gray-700 hover:bg-gray-100 transition-colors">Galerija</a>
            <a href="#kontakt" class="block text-center py-3 text-gray-700 hover:bg-gray-100 transition-colors">Kontakt</a>
            <div class="mt-4 text-center px-6">
                <a href="#kontakt" class="inline-block btn-primary py-3 px-6 rounded-full font-bold text-sm uppercase tracking-wider w-full">Pridruži se</a>
            </div>
        </div>
    </header>

    <main>
        <!-- Hero Section -->
        <section id="home" class="hero-section text-white min-h-screen flex items-center justify-center relative">
            <!-- Floating elements for visual interest -->
            <div class="absolute top-20 left-10 floating-element opacity-20">
                <i class="fas fa-fist-raised text-6xl text-gusar-red"></i>
            </div>
            <div class="absolute bottom-20 right-10 floating-element opacity-20" style="animation-delay: -3s;">
                <i class="fas fa-medal text-6xl text-gusar-blue"></i>
            </div>
            
            <div class="text-center z-10 px-4" data-aos="fade-up">
                <h1 class="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider drop-shadow-2xl mb-6" data-aos="fade-up" data-aos-delay="200">
                    Postanite Dio Naše <br> 
                    <span class="text-gradient">Taekwondo Obitelji</span>
                </h1>
                
                <p class="mt-6 text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg leading-relaxed opacity-90" data-aos="fade-up" data-aos-delay="300">
                    Snaga, disciplina i zajedništvo u srcu Omiša. Pridružite nam se i otkrijte svoj potencijal kroz umjetnost taekwondo-a.
                </p>
                
                <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="400">
                    <a href="#o-nama" class="btn-primary text-lg py-4 px-10 rounded-full font-bold uppercase tracking-wider">
                        <i class="fas fa-arrow-right mr-2"></i>Saznaj Više
                    </a>
                    <a href="#kontakt" class="btn-secondary text-lg py-4 px-10 rounded-full font-bold uppercase tracking-wider">
                        <i class="fas fa-user-plus mr-2"></i>Upiši se
                    </a>
                </div>
                
                <!-- Stats -->
                <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="500">
                    <div class="stats-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-black text-gusar-red mb-2">15+</div>
                        <div class="text-sm uppercase tracking-wider opacity-80">Godina Rada</div>
                    </div>
                    <div class="stats-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-black text-gusar-blue mb-2">100+</div>
                        <div class="text-sm uppercase tracking-wider opacity-80">Članova</div>
                    </div>
                    <div class="stats-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-black text-gusar-red mb-2">50+</div>
                        <div class="text-sm uppercase tracking-wider opacity-80">Medalja</div>
                    </div>
                    <div class="stats-card p-6 rounded-2xl text-center">
                        <div class="text-3xl font-black text-gusar-blue mb-2">4</div>
                        <div class="text-sm uppercase tracking-wider opacity-80">Grupe</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- O Nama Section -->
        <section id="o-nama" class="py-24 md:py-32 bg-gray-50 relative">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-6xl font-black text-gusar-dark mb-6" data-aos="fade-up">
                        Dobrodošli u <span class="text-gradient">TKD Gusar</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-8" data-aos="fade-up" data-aos-delay="100"></div>
                    <p class="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Taekwondo klub Gusar je mjesto gdje se rađaju šampioni, ne samo u sportu, već i u životu. Kroz godine predanog rada, stvorili smo zajednicu posvećenu izvrsnosti, disciplini i međusobnom poštovanju.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div data-aos="fade-right">
                        <img src="https://page.gensparksite.com/v1/base64_upload/96e916f1f7c6f26fdffd3c625dead7fd" alt="Demonstracija visokih udaraca" class="rounded-3xl shadow-2xl gallery-img">
                    </div>
                    <div data-aos="fade-left">
                        <h3 class="text-3xl font-bold text-gusar-dark mb-6">Naša Misija</h3>
                        <p class="text-lg text-gray-600 leading-relaxed mb-6">
                            Kroz umjetnost taekwondo-a razvijamo ne samo fizičke sposobnosti, već i karakter naših članova. Svaki trening je prilika za rast, učenje i stvaranje prijateljstava koja traju cijeli život.
                        </p>
                        <ul class="space-y-3">
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check text-gusar-red mr-3"></i>
                                Individualan pristup svakom članu
                            </li>
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check text-gusar-red mr-3"></i>
                                Stručni i certificirani treneri
                            </li>
                            <li class="flex items-center text-gray-700">
                                <i class="fas fa-check text-gusar-red mr-3"></i>
                                Fokus na sigurnost i pravilnu tehniku
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="benefit-card p-8 rounded-3xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gusar-red to-pink-500 rounded-2xl flex items-center justify-center">
                            <i class="fas fa-fist-raised text-3xl text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 text-gusar-dark">Disciplina i Fokus</h3>
                        <p class="text-gray-600 leading-relaxed">Naučite samokontrolu i mentalnu snagu koja će vam koristiti u svim aspektima života.</p>
                    </div>
                    
                    <div class="benefit-card p-8 rounded-3xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gusar-blue to-blue-500 rounded-2xl flex items-center justify-center">
                            <i class="fas fa-heartbeat text-3xl text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 text-gusar-dark">Vrhunska Kondicija</h3>
                        <p class="text-gray-600 leading-relaxed">Poboljšajte svoju fizičku spremu, agilnost i izdržljivost kroz dinamične treninge.</p>
                    </div>
                    
                    <div class="benefit-card p-8 rounded-3xl shadow-lg text-center" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gusar-red to-gusar-blue rounded-2xl flex items-center justify-center">
                            <i class="fas fa-users text-3xl text-white"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4 text-gusar-dark">Zajedništvo</h3>
                        <p class="text-gray-600 leading-relaxed">Postanite dio tima koji se podržava, motivira i zajedno slavi uspjehe.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Treninzi Section -->
        <section id="treninzi" class="py-24 md:py-32 bg-white">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-6xl font-black text-gusar-dark mb-6" data-aos="fade-up">
                        Raspored <span class="text-gradient">Treninga</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-8" data-aos="fade-up" data-aos-delay="100"></div>
                </div>

                <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-gradient-to-r from-gusar-dark to-gray-800 text-white">
                                <tr>
                                    <th class="p-6 font-bold uppercase tracking-wider text-sm">Grupa</th>
                                    <th class="p-6 font-bold uppercase tracking-wider text-sm">Dani</th>
                                    <th class="p-6 font-bold uppercase tracking-wider text-sm">Vrijeme</th>
                                    <th class="p-6 font-bold uppercase tracking-wider text-sm">Lokacija</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <tr class="hover:bg-red-50 transition-colors">
                                    <td class="p-6">
                                        <div class="flex items-center">
                                            <div class="w-4 h-4 bg-gusar-red rounded-full mr-3"></div>
                                            <span class="font-bold text-gusar-red">Vrtićanci 1 (3-4 godine)</span>
                                        </div>
                                    </td>
                                    <td class="p-6 text-gray-700">Utorak, Četvrtak</td>
                                    <td class="p-6 font-semibold text-gray-800">18:00 - 18:45</td>
                                    <td class="p-6 text-gray-700">Četvrt Ribnjak, Omiš</td>
                                </tr>
                                <tr class="hover:bg-blue-50 transition-colors">
                                    <td class="p-6">
                                        <div class="flex items-center">
                                            <div class="w-4 h-4 bg-gusar-blue rounded-full mr-3"></div>
                                            <span class="font-bold text-gusar-blue">Vrtićanci 2 (5-6 godina)</span>
                                        </div>
                                    </td>
                                    <td class="p-6 text-gray-700">Utorak, Četvrtak</td>
                                    <td class="p-6 font-semibold text-gray-800">19:00 - 19:45</td>
                                    <td class="p-6 text-gray-700">Četvrt Ribnjak, Omiš</td>
                                </tr>
                                <tr class="hover:bg-red-50 transition-colors">
                                    <td class="p-6">
                                        <div class="flex items-center">
                                            <div class="w-4 h-4 bg-gusar-red rounded-full mr-3"></div>
                                            <span class="font-bold text-gusar-red">Školarci 1 (1. i 2. razred)</span>
                                        </div>
                                    </td>
                                    <td class="p-6 text-gray-700">Ponedjeljak, Srijeda, Petak</td>
                                    <td class="p-6 font-semibold text-gray-800">18:30 - 19:30</td>
                                    <td class="p-6 text-gray-700">Četvrt Ribnjak, Omiš</td>
                                </tr>
                                <tr class="hover:bg-blue-50 transition-colors">
                                    <td class="p-6">
                                        <div class="flex items-center">
                                            <div class="w-4 h-4 bg-gusar-blue rounded-full mr-3"></div>
                                            <span class="font-bold text-gusar-blue">Školarci 2 (3. 4. 5. razred)</span>
                                        </div>
                                    </td>
                                    <td class="p-6 text-gray-700">Ponedjeljak, Srijeda, Petak</td>
                                    <td class="p-6 font-semibold text-gray-800">19:45 - 20:45</td>
                                    <td class="p-6 text-gray-700">Četvrt Ribnjak, Omiš</td>
                                </tr>
                                <tr class="hover:bg-red-50 transition-colors">
                                    <td class="p-6">
                                        <div class="flex items-center">
                                            <div class="w-4 h-4 bg-gusar-red rounded-full mr-3"></div>
                                            <span class="font-bold text-gusar-red">Natjecatelji</span>
                                        </div>
                                    </td>
                                    <td class="p-6 text-gray-700">Pon, Sri, Pet: 20:45-22:00<br>Uto, Čet: 20:00-21:15</td>
                                    <td class="p-6 font-semibold text-gray-800">20:00 - 22:00</td>
                                    <td class="p-6 text-gray-700">Četvrt Ribnjak, Omiš</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="300">
                    <p class="text-lg text-gray-600 mb-8">Zainteresirani ste za naše treninge? Kontaktirajte nas za više informacija!</p>
                    <a href="#kontakt" class="btn-primary py-4 px-8 rounded-full font-bold uppercase tracking-wider inline-flex items-center">
                        <i class="fas fa-phone mr-2"></i>Kontaktiraj Nas
                    </a>
                </div>
            </div>
        </section>


        <!-- Galerija Section -->
        <section id="galerija" class="py-24 md:py-32 bg-gray-50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-6xl font-black text-gusar-dark mb-6" data-aos="fade-up">
                        Naša <span class="text-gradient">Galerija</span>
                    </h2>
                    <div class="section-divider w-32 mx-auto mb-8" data-aos="fade-up" data-aos-delay="100"></div>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Pogledajte trenutke koji najbolje opisuju duh našeg kluba - od treninga do natjecanja, od početnika do šampiona.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Hero slika - velika -->
                    <div class="lg:col-span-2 lg:row-span-2" data-aos="zoom-in" data-aos-delay="100">
                        <div class="overflow-hidden rounded-3xl h-full shadow-2xl">
                            <img src="https://page.gensparksite.com/v1/base64_upload/be068479058a82215924b3fa793483a3" alt="Treneri TKD Gusar" class="gallery-img w-full h-full object-cover">
                        </div>
                    </div>
                    
                    <!-- Ostale slike -->
                    <div class="overflow-hidden rounded-3xl shadow-xl" data-aos="zoom-in" data-aos-delay="150">
                        <img src="https://page.gensparksite.com/v1/base64_upload/5a8a07dab0e9ba135dcd452cb187e6fe" alt="Trener s učenikom" class="gallery-img w-full h-64 object-cover">
                    </div>
                    
                    <div class="overflow-hidden rounded-3xl shadow-xl" data-aos="zoom-in" data-aos-delay="200">
                        <img src="https://page.gensparksite.com/v1/base64_upload/60f3766cd722653b9144ab5c4a42aa8b" alt="Skok preko prepreke" class="gallery-img w-full h-64 object-cover">
                    </div>
                    
                    <div class="overflow-hidden rounded-3xl shadow-xl" data-aos="zoom-in" data-aos-delay="250">
                        <img src="https://page.gensparksite.com/v1/base64_upload/fa538255685853bded4d40594eb3139b" alt="Trening udaraca" class="gallery-img w-full h-64 object-cover">
                    </div>
                    
                    <div class="overflow-hidden rounded-3xl shadow-xl" data-aos="zoom-in" data-aos-delay="300">
                        <img src="https://page.gensparksite.com/v1/base64_upload/004a3995d2abe8488442ed1fd15d4519" alt="Instrukcije trenera" class="gallery-img w-full h-64 object-cover">
                    </div>
                    
                    <div class="lg:col-span-2" data-aos="zoom-in" data-aos-delay="350">
                        <div class="overflow-hidden rounded-3xl shadow-2xl">
                            <img src="https://page.gensparksite.com/v1/base64_upload/b94bff5c3594c48d8f093785159c6d96" alt="Trening s štitovima" class="gallery-img w-full h-64 object-cover">
                        </div>
                    </div>
                    
                    <div class="overflow-hidden rounded-3xl shadow-xl" data-aos="zoom-in" data-aos-delay="400">
                        <img src="https://page.gensparksite.com/v1/base64_upload/96e916f1f7c6f26fdffd3c625dead7fd" alt="Demonstracija tehnika" class="gallery-img w-full h-64 object-cover">
                    </div>
                </div>
                
                <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="500">
                    <p class="text-lg text-gray-600 mb-6">Želite vidjeti više? Pratite nas na društvenim mrežama!</p>
                    <div class="flex justify-center space-x-4">
                        <a href="https://www.facebook.com/www.tkdgusar.hr" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110">
                            <i class="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="https://www.instagram.com/tkd_gusar/" target="_blank" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all hover:scale-110">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Kontakt Section -->
        <section id="kontakt" class="py-24 md:py-32 bg-gradient-to-br from-gusar-dark via-gray-800 to-gusar-dark text-white relative overflow-hidden">
            <!-- Background pattern -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><circle cx=\"30\" cy=\"30\" r=\"2\"/></g></g></svg>');"></div>
            </div>
            
            <div class="container mx-auto px-6 relative z-10">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-6xl font-black mb-6" data-aos="fade-up">
                        Kontaktirajte <span class="text-gusar-red">Nas</span>
                    </h2>
                    <div class="w-32 h-1 bg-gradient-to-r from-gusar-red to-gusar-blue mx-auto mb-8" data-aos="fade-up" data-aos-delay="100"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Kontakt forma -->
                    <div data-aos="fade-right" data-aos-delay="200">
                        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                            <h3 class="text-3xl font-bold mb-6 flex items-center">
                                <i class="fas fa-envelope text-gusar-red mr-3"></i>
                                Pošaljite nam poruku
                            </h3>
                            <form id="contact-form" action="#" method="POST" class="space-y-6">
                                <div>
                                    <label for="name" class="block mb-2 font-medium">Ime i prezime</label>
                                    <input type="text" id="name" name="name" class="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-gusar-red transition-colors placeholder-white/60" placeholder="Vaše ime i prezime" required>
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 font-medium">Email adresa</label>
                                    <input type="email" id="email" name="email" class="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-gusar-red transition-colors placeholder-white/60" placeholder="vasa@email.com" required>
                                </div>
                                <div>
                                    <label for="message" class="block mb-2 font-medium">Poruka</label>
                                    <textarea id="message" name="message" rows="5" class="w-full p-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-gusar-red transition-colors resize-none placeholder-white/60" placeholder="Vaša poruka..." required></textarea>
                                </div>
                                <button type="submit" class="w-full btn-primary py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wider">
                                    <i class="fas fa-paper-plane mr-2"></i>Pošalji Poruku
                                </button>
                                <div id="form-success" class="form-success">
                                    <i class="fas fa-check-circle mr-2"></i>
                                    Zahvaljujemo na poslanom upitu. Odgovoriti ćemo vam u najkraćem mogućem roku.
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <!-- Informacije i mapa -->
                    <div data-aos="fade-left" data-aos-delay="300">
                        <div class="space-y-8">
                            <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                                <h3 class="text-3xl font-bold mb-6 flex items-center">
                                    <i class="fas fa-info-circle text-gusar-blue mr-3"></i>
                                    Informacije
                                </h3>
                                <div class="space-y-6 text-lg">
                                    <div class="flex items-start">
                                        <i class="fas fa-map-marker-alt text-gusar-red mr-4 mt-1 text-xl"></i>
                                        <div>
                                            <div class="font-semibold">Adresa:</div>
                                            <div class="opacity-90">Četvrt Ribnjak, 21310, Omiš</div>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-envelope text-gusar-red mr-4 mt-1 text-xl"></i>
                                        <div>
                                            <div class="font-semibold">Email:</div>
                                            <a href="mailto:jvrdoljak41@gmail.com" class="opacity-90 hover:text-gusar-red transition-colors">jvrdoljak41@gmail.com</a>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-phone text-gusar-red mr-4 mt-1 text-xl"></i>
                                        <div>
                                            <div class="font-semibold">Telefon:</div>
                                            <a href="tel:+385955675520" class="opacity-90 hover:text-gusar-red transition-colors">095 567 55 20</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-8">
                                    <h4 class="text-xl font-bold mb-4 flex items-center">
                                        <i class="fas fa-share-alt text-gusar-blue mr-2"></i>
                                        Pratite nas
                                    </h4>
                                    <div class="flex space-x-4">
                                        <a href="https://www.facebook.com/www.tkdgusar.hr" target="_blank" class="bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-2xl transition-all hover:scale-110 hover:-translate-y-1">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                        <a href="https://www.instagram.com/tkd_gusar/" target="_blank" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-4 rounded-xl text-2xl transition-all hover:scale-110 hover:-translate-y-1">
                                            <i class="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Mapa -->
                            <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                                <h4 class="text-xl font-bold mb-4 flex items-center">
                                    <i class="fas fa-map text-gusar-red mr-2"></i>
                                    Naša Lokacija
                                </h4>
                                <div class="rounded-2xl overflow-hidden shadow-lg">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.50508197775!2d16.68748367676641!3d43.44916896229986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a834241103c8b%3A0x6283592e3f53833d!2s%C4%8Cetvrt%20Ribnjak%2C%2021310%2C%20Omi%C5%A1%2C%20Croatia!5e0!3m2!1sen!2sus!4v1723945831341!5m2!1sen!2sus" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="py-12 bg-black text-gray-400 relative">
        <div class="container mx-auto px-6 text-center">
            <p class="mb-2 text-white">&copy; <span id="current-year"></span> Taekwondo Klub Gusar. Sva prava pridržana.</p>
            <p class="text-sm">
                Web stranicu izradio 
                <a href="https://startdigital.hr" target="_blank" class="font-semibold text-gusar-red hover:text-white transition-colors">
                    Start Digital
                </a>
            </p>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background change on scroll
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }
        });

        // Enhanced form handling with success message
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Molimo unesite sva polja.');
                return;
            }
            
            // Simulate sending to jvrdoljak41@gmail.com
            // In production, this would be handled by a backend service
            
            // Show success message
            const successDiv = document.getElementById('form-success');
            successDiv.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
        });
    </script>

</body>
</html>
  `)
})

export default app
