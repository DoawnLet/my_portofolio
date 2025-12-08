"use client";

import React, { useState } from "react";
import {
  Code,
  Database,
  Shield,
  Zap,
  Layers,
  Server,
  Globe,
  Cpu,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function ASPNetDocs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const features = [
    {
      icon: <Server className="w-8 h-8 text-cyan-400" />,
      title: "Web Forms",
      description:
        "Event-driven programming model for rapid web application development with drag-and-drop controls.",
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: "MVC Architecture",
      description:
        "Model-View-Controller pattern for clean separation of concerns and maintainable code structure.",
    },
    {
      icon: <Database className="w-8 h-8 text-cyan-400" />,
      title: "Entity Framework",
      description:
        "Powerful ORM for seamless database operations with LINQ support and code-first migrations.",
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Security Framework",
      description:
        "Built-in authentication, authorization, and data protection mechanisms.",
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      title: "Web API",
      description:
        "RESTful API development with automatic content negotiation and OData support.",
    },
    {
      icon: <Layers className="w-8 h-8 text-cyan-400" />,
      title: "SignalR",
      description:
        "Real-time web functionality for building interactive applications with WebSockets.",
    },
  ];

  const codeExamples = [
    {
      title: "Basic MVC Controller",
      language: "csharp",
      code: `using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Message"] = "Welcome to ASP.NET Core!";
            return View();
        }

        [HttpPost]
        public IActionResult Create(UserModel model)
        {
            if (ModelState.IsValid)
            {
                // Save to database
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}`,
    },
    {
      title: "Entity Framework Code-First",
      language: "csharp",
      code: `using Microsoft.EntityFrameworkCore;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}`,
    },
    {
      title: "Web API Controller",
      language: "csharp",
      code: `using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
                return NotFound();

            return Ok(product);
        }
    }
}`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content with Sidebar Padding */}
      <div className="md:ml-64 transition-all duration-300">
        <Navbar />

        {/* Hero Section */}
        <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-2 mb-8">
              <Code className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">
                ASP.NET Documentation
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                ASP.NET
              </span>
              <br />
              <span className="text-gray-300">Framework Guide</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Comprehensive guide to Microsoft&apos;s ASP.NET framework. Learn
              about Web Forms, MVC, Web API, Entity Framework, and modern web
              development practices with .NET.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Enterprise Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg px-4 py-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-300">High Performance</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg px-4 py-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Secure by Default</span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section
          id="overview"
          className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  What is ASP.NET?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                ASP.NET is Microsoft&apos;s open-source, cross-platform
                framework for building modern web applications and services with
                .NET. It provides a comprehensive programming model for
                developing web applications using C# or F#.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      Cross-platform development (Windows, Linux, macOS)
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      Built-in dependency injection
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      Middleware pipeline for request processing
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      Razor pages for rapid development
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">
                      Integrated testing support
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-violet-400">
                  Architecture
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-cyan-400 pl-4">
                    <h4 className="font-semibold text-cyan-400">
                      ASP.NET Core
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Modern, modular framework for cloud-ready applications
                    </p>
                  </div>
                  <div className="border-l-4 border-violet-400 pl-4">
                    <h4 className="font-semibold text-violet-400">
                      Kestrel Server
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Cross-platform web server for ASP.NET Core
                    </p>
                  </div>
                  <div className="border-l-4 border-fuchsia-400 pl-4">
                    <h4 className="font-semibold text-fuchsia-400">
                      Middleware
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Request/response pipeline components
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="architecture"
          className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  Core Components
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Essential ASP.NET technologies for modern web development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section
          id="examples"
          className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  Code Examples
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Practical ASP.NET implementation examples
              </p>
            </div>

            <div className="space-y-8">
              {codeExamples.map((example, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl overflow-hidden"
                >
                  <div className="bg-slate-800/50 px-6 py-4 border-b border-cyan-400/20">
                    <h3 className="text-xl font-bold text-cyan-400">
                      {example.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
                      <code className="text-green-400 text-sm font-mono">
                        {example.code}
                      </code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section
          id="getting-started"
          className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  Getting Started
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Quick setup guide for ASP.NET development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">
                  Prerequisites
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">.NET SDK 6.0 or later</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">
                      Visual Studio 2022 or VS Code
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">SQL Server (optional)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">
                      Git for version control
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-violet-400">
                  Quick Start Commands
                </h3>
                <div className="space-y-4 font-mono text-sm">
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-cyan-400 mb-2">
                      # Create new ASP.NET Core MVC project
                    </div>
                    <div className="text-green-400">
                      dotnet new mvc -n MyAspNetApp
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-cyan-400 mb-2">
                      # Run the application
                    </div>
                    <div className="text-green-400">
                      cd MyAspNetApp && dotnet run
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-cyan-400 mb-2">
                      # Add Entity Framework
                    </div>
                    <div className="text-green-400">
                      dotnet add package Microsoft.EntityFrameworkCore.SqlServer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Learn More
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <a
                href="https://docs.microsoft.com/en-us/aspnet/core/"
                className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105 block"
              >
                <Globe className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Official Documentation
                </h3>
                <p className="text-gray-400">
                  Comprehensive ASP.NET Core docs from Microsoft
                </p>
              </a>

              <a
                href="https://github.com/dotnet/aspnetcore"
                className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105 block"
              >
                <Code className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Source Code</h3>
                <p className="text-gray-400">
                  ASP.NET Core repository on GitHub
                </p>
              </a>

              <a
                href="https://stackoverflow.com/questions/tagged/asp.net-core"
                className="bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105 block"
              >
                <Star className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                <p className="text-gray-400">
                  Get help from the ASP.NET community
                </p>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
