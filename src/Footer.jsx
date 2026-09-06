function Footer(){
    return (
      <>
        <footer class="mt-24 p-12 bg-gray-900 text-gray-400 ">
          <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 class="text-lg font-semibold  text-white">Company</h4>
              <ul class="mt-2 flex flex-col gap-y-2">
                <li>
                  <a href="#" class="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white">
                    Carrers
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold  text-white">Resources</h4>
              <ul class="mt-2 flex flex-col gap-y-2">
                <li>
                  <a href="#" class="hover:text-white">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white">
                    community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold  text-white">Support</h4>
              <ul class="mt-2 flex flex-col gap-y-2">
                <li>
                  <a href="#" class="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold  text-white">Follow Us</h4>
              <ul class="mt-2 flex flex-col gap-y-2">
                <li>
                  <a
                    href="http://www.instagram.com/kamesh._.6/"
                    class="hover:text-white"
                  >Instagram</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/kameshkamalakannan" class="hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="http://github.com/Kamesh-06-06" class="hover:text-white">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p class="text-center mt-8">© 2026 e-Cart. All Rights Reserved.</p>
        </footer>
      </>
    );
}
export default Footer;