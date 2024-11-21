import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Button, Dropdown} from "antd";

const Navbar = () => {
    const navigate = useNavigate()
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <i className="fas fa-user-circle"></i> {/* Admin Icon */}
                    Admin </a>
            ),
        },
    ]
    return (
        <nav className="bg-[#F1ECFF] py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Left side logo */}
                <div className="flex items-center">
                    <div className="h-10 w-auto">
                        <svg
                            id="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="100%"
                            height="100%"
                            viewBox="0 0 400 400"
                            className="h-10 w-auto"
                        >
                            <g id="svgg">
                                <path
                                    id="path0"
                                    d="M198.393 40.409 C 198.298 40.504,196.554 40.619,194.520 40.663 C 190.141 40.757,181.436 41.653,177.719 42.392 C 177.190 42.497,175.615 42.765,174.219 42.988 C 172.822 43.212,171.152 43.482,170.508 43.588 C 166.644 44.229,159.356 46.338,150.579 49.354 C 147.181 50.522,135.675 55.478,134.570 56.250 C 134.355 56.400,132.784 57.271,131.078 58.185 C 129.373 59.099,126.209 61.027,124.047 62.468 C 121.886 63.910,118.975 65.775,117.578 66.613 C 116.182 67.451,113.809 69.177,112.305 70.448 C 110.801 71.720,107.988 74.075,106.055 75.681 C 99.935 80.766,88.464 93.032,83.313 100.000 C 76.468 109.260,75.810 109.324,69.208 101.367 C 64.451 95.634,63.457 94.918,60.273 94.928 C 54.863 94.944,54.487 96.123,55.283 110.547 C 55.384 112.373,55.641 117.559,55.855 122.070 C 56.068 126.582,56.412 131.943,56.617 133.984 C 56.823 136.025,57.096 139.014,57.224 140.625 C 57.352 142.236,57.537 143.906,57.635 144.336 C 57.733 144.766,57.891 146.161,57.986 147.436 C 58.178 150.019,60.240 153.603,62.109 154.601 C 64.265 155.753,74.196 154.046,81.945 151.191 C 83.723 150.536,85.511 150.000,85.917 150.000 C 86.322 150.000,89.262 149.232,92.448 148.293 C 95.635 147.355,100.251 146.207,102.706 145.742 C 114.031 143.599,118.206 136.429,111.542 130.568 C 110.064 129.268,98.412 124.219,96.890 124.219 C 96.262 124.219,96.406 122.758,97.312 119.949 C 99.434 113.370,100.260 111.142,100.537 111.251 C 100.882 111.386,103.125 108.409,103.125 107.816 C 103.125 107.599,103.345 107.420,103.613 107.418 C 103.882 107.416,105.332 105.925,106.836 104.106 C 108.340 102.286,109.696 100.793,109.849 100.789 C 110.003 100.785,110.545 100.168,111.054 99.419 C 111.563 98.670,112.611 97.571,113.382 96.978 C 119.303 92.423,122.624 89.824,123.088 89.382 C 124.596 87.947,127.743 85.514,129.380 84.518 C 130.393 83.902,132.415 82.589,133.873 81.599 C 136.882 79.556,147.091 74.201,149.428 73.440 C 150.280 73.162,152.426 72.269,154.197 71.455 C 159.691 68.929,168.135 66.284,172.852 65.611 C 174.570 65.365,177.656 64.831,179.708 64.423 C 181.761 64.016,183.958 63.615,184.591 63.533 C 185.224 63.451,186.006 63.288,186.328 63.170 C 188.684 62.310,206.912 62.156,216.602 62.914 C 225.139 63.582,237.201 65.969,244.531 68.440 C 249.589 70.146,249.834 70.037,252.279 64.992 C 254.260 60.905,258.311 58.204,262.461 58.203 L 264.258 58.202 264.236 56.024 C 264.208 53.319,264.216 53.325,255.600 49.844 C 245.134 45.615,233.158 42.660,222.995 41.798 C 220.281 41.567,217.644 41.292,217.135 41.186 C 214.310 40.595,198.848 39.954,198.393 40.409 M277.327 64.603 C 272.749 67.964,271.613 71.818,272.850 79.798 C 273.188 81.983,275.745 84.742,279.637 87.122 C 283.287 89.355,285.062 90.778,289.987 95.417 C 292.548 97.830,295.520 100.596,296.591 101.563 C 307.449 111.363,322.791 136.048,327.305 150.977 C 327.759 152.480,328.295 154.063,328.495 154.492 C 328.800 155.149,329.133 156.218,330.320 160.352 C 331.284 163.709,332.103 167.061,332.419 168.945 C 332.636 170.234,332.891 171.729,332.987 172.266 C 333.083 172.803,333.256 174.121,333.371 175.195 C 333.485 176.270,333.752 178.291,333.963 179.688 C 334.174 181.084,334.533 183.515,334.760 185.089 C 336.126 194.542,344.816 197.879,349.674 190.815 C 351.658 187.930,351.860 178.461,350.201 166.211 C 348.162 151.162,347.346 147.944,342.028 133.984 C 333.595 111.846,314.442 86.948,294.531 72.239 C 291.846 70.255,288.857 67.937,287.891 67.087 C 283.594 63.312,280.180 62.509,277.327 64.603 M190.976 87.212 C 188.627 88.777,188.205 90.245,188.259 96.685 C 188.305 102.217,188.288 102.344,187.472 102.344 C 183.834 102.344,171.381 108.353,165.820 112.792 C 142.936 131.058,142.224 161.405,164.221 180.924 C 169.611 185.707,178.068 190.179,183.889 191.324 C 188.651 192.261,188.240 190.998,188.537 205.584 C 188.840 220.428,189.143 219.605,184.610 216.253 C 180.129 212.939,178.224 210.238,175.191 202.898 C 171.614 194.242,168.883 194.269,155.664 203.098 C 152.871 204.963,148.864 207.501,146.759 208.737 C 142.440 211.274,141.971 211.940,142.583 214.672 C 143.134 217.127,146.058 223.618,147.764 226.172 C 148.553 227.354,149.844 229.287,150.633 230.469 C 153.730 235.111,155.908 237.224,163.112 242.578 C 169.546 247.359,177.367 250.644,186.399 252.358 L 188.618 252.779 188.418 261.253 C 188.103 274.607,188.782 275.010,209.654 273.854 C 210.503 273.807,212.993 271.335,213.561 269.974 C 213.988 268.954,214.095 266.881,214.028 260.994 L 213.939 253.340 218.714 252.275 C 231.457 249.430,241.228 243.089,248.242 233.112 C 249.102 231.890,250.531 229.894,251.418 228.677 C 257.499 220.337,258.035 200.004,252.466 188.909 C 245.853 175.733,236.771 169.270,218.057 164.419 C 214.160 163.409,213.295 163.058,213.440 162.545 C 213.538 162.198,213.740 156.333,213.888 149.512 C 214.037 142.690,214.247 137.109,214.356 137.109 C 216.560 137.109,221.664 142.216,223.645 146.404 C 226.000 151.383,227.758 153.125,230.427 153.125 C 232.778 153.125,243.198 148.121,247.852 144.756 C 248.496 144.290,250.386 143.069,252.052 142.043 C 258.288 138.201,257.073 134.289,245.171 119.899 C 238.583 111.933,222.008 102.344,214.828 102.344 C 214.198 102.344,214.120 101.788,213.995 96.387 C 213.765 86.493,213.554 86.328,201.086 86.328 C 192.614 86.328,192.256 86.359,190.976 87.212 M205.230 96.777 C 205.351 97.583,205.311 100.176,205.142 102.539 C 204.650 109.423,205.133 110.153,210.547 110.708 C 223.815 112.070,234.470 118.943,242.871 131.559 C 245.979 136.226,246.261 135.550,239.425 139.810 C 231.865 144.520,232.071 144.487,230.692 141.243 C 229.295 137.954,226.210 133.877,224.103 132.535 C 223.200 131.959,222.109 131.184,221.680 130.812 C 219.550 128.970,211.166 125.841,208.044 125.722 C 204.777 125.599,204.937 124.710,204.908 143.120 C 204.894 152.024,204.764 159.428,204.618 159.574 C 204.473 159.720,202.731 159.343,200.748 158.736 L 197.143 157.634 197.385 143.233 C 197.651 127.391,197.675 127.589,195.274 126.347 C 190.709 123.987,178.641 130.642,175.345 137.338 C 169.709 148.787,179.367 162.951,195.117 166.334 C 200.319 167.451,207.835 169.938,214.648 172.796 C 215.937 173.337,218.622 174.135,220.615 174.570 C 230.765 176.784,237.319 181.287,242.977 189.932 C 248.334 198.118,249.468 213.001,245.351 221.094 C 237.706 236.119,226.575 243.777,209.623 245.673 C 204.558 246.240,204.593 246.162,204.753 256.602 L 204.883 265.039 201.113 265.150 L 197.344 265.262 197.557 256.539 C 197.797 246.685,197.743 246.426,195.181 245.313 C 193.613 244.631,192.520 244.419,187.891 243.902 C 174.196 242.371,157.353 229.281,153.073 216.842 C 152.191 214.276,152.180 214.063,152.937 214.063 C 153.666 214.063,160.397 210.715,160.720 210.192 C 161.200 209.415,166.412 206.207,166.803 206.449 C 167.026 206.587,167.984 208.241,168.929 210.124 C 174.211 220.642,183.675 228.356,191.878 228.830 C 197.777 229.172,197.858 229.025,197.552 218.494 C 197.260 208.412,197.630 195.638,198.203 196.003 C 198.440 196.154,198.721 196.292,198.828 196.310 C 198.936 196.328,200.273 196.736,201.801 197.217 L 204.579 198.090 204.777 200.510 C 204.885 201.841,205.007 208.467,205.046 215.234 C 205.136 230.787,205.239 230.989,212.331 229.553 C 228.579 226.264,236.547 207.982,226.324 197.446 C 222.692 193.704,212.880 190.059,199.515 187.487 C 198.496 187.291,195.772 186.409,193.460 185.526 C 191.149 184.643,188.027 183.573,186.523 183.148 C 176.915 180.434,168.640 174.579,163.570 166.905 C 159.038 160.044,157.928 156.841,157.307 148.828 L 156.928 143.945 158.381 138.477 C 159.181 135.469,160.056 132.744,160.327 132.422 C 160.597 132.100,160.940 131.572,161.089 131.250 C 161.433 130.502,161.890 129.738,164.127 126.158 C 165.309 124.268,166.614 122.765,167.838 121.886 C 173.664 117.703,175.137 116.744,178.516 114.929 C 182.742 112.659,188.037 110.832,192.456 110.119 C 197.204 109.353,197.266 109.244,197.266 101.580 L 197.266 95.313 201.138 95.313 L 205.009 95.313 205.230 96.777 M168.112 130.113 C 166.785 130.497,165.425 132.174,165.864 132.884 C 166.030 133.153,165.961 133.215,165.685 133.045 C 165.437 132.892,165.234 132.934,165.234 133.138 C 165.234 134.671,166.944 133.967,168.238 131.901 C 168.799 131.006,169.451 130.144,169.687 129.986 C 170.240 129.617,169.660 129.664,168.112 130.113 M187.960 153.602 C 187.771 153.791,186.805 152.982,185.761 151.760 C 181.300 146.538,181.992 140.010,187.305 137.188 C 188.145 136.742,188.785 152.777,187.960 153.602 M55.469 171.215 C 52.816 173.077,51.566 175.373,51.141 179.163 C 50.473 185.121,51.373 207.424,52.518 213.281 C 55.817 230.151,58.560 238.298,64.952 250.195 C 67.426 254.801,74.732 266.135,77.071 268.999 C 77.973 270.102,80.977 273.847,83.747 277.321 C 91.418 286.940,101.383 296.306,111.385 303.295 C 113.824 304.999,116.316 306.800,116.922 307.297 C 118.985 308.987,129.480 314.992,133.215 316.619 C 135.263 317.511,137.636 318.674,138.489 319.202 C 141.547 321.097,145.974 322.847,154.963 325.715 C 161.652 327.849,167.006 329.179,173.148 330.233 C 173.741 330.335,174.532 330.511,174.906 330.624 C 175.280 330.737,178.223 331.115,181.445 331.463 C 184.668 331.812,188.623 332.249,190.234 332.434 C 196.397 333.142,212.859 332.627,221.094 331.470 C 221.846 331.364,223.604 331.171,225.000 331.040 C 226.396 330.909,229.297 330.385,231.445 329.874 C 233.594 329.363,236.455 328.752,237.803 328.516 C 239.151 328.280,241.788 327.497,243.662 326.776 C 245.537 326.055,248.916 324.897,251.172 324.203 C 255.877 322.755,260.015 320.958,269.405 316.285 C 275.284 313.359,278.087 311.645,287.408 305.273 C 294.610 300.350,306.415 289.934,310.240 285.128 C 311.192 283.930,313.025 281.909,314.312 280.636 C 316.755 278.219,319.512 274.735,321.091 272.070 C 321.600 271.211,322.556 269.887,323.215 269.128 C 323.875 268.369,324.766 267.252,325.195 266.647 C 326.935 264.194,330.608 259.541,331.147 259.107 C 332.307 258.172,334.866 259.891,340.625 265.473 C 344.310 269.044,345.886 269.771,348.603 269.151 C 353.956 267.930,354.909 263.159,352.173 251.277 C 351.626 248.904,350.912 245.053,350.586 242.719 C 350.260 240.386,349.737 236.982,349.423 235.156 C 349.109 233.330,348.746 230.869,348.617 229.688 C 348.488 228.506,348.307 227.268,348.214 226.937 C 348.122 226.606,347.881 225.112,347.679 223.617 C 347.018 218.727,345.970 216.426,343.651 214.772 C 342.231 213.759,336.188 213.442,335.108 214.324 C 334.812 214.565,331.758 215.489,328.320 216.376 C 312.235 220.527,295.828 226.233,292.707 228.760 C 287.433 233.031,289.540 238.375,296.714 238.924 C 300.222 239.193,308.251 242.511,309.742 244.307 C 310.304 244.985,309.249 247.916,306.385 253.628 C 298.173 270.012,276.842 288.910,256.781 297.576 C 243.250 303.421,235.827 306.250,234.019 306.250 C 233.564 306.250,232.887 306.411,232.514 306.607 C 231.128 307.338,220.450 309.520,215.820 310.019 C 214.746 310.135,212.812 310.376,211.523 310.555 C 207.893 311.058,190.079 310.553,189.001 309.916 C 188.860 309.833,186.927 309.584,184.704 309.362 C 181.077 309.001,178.154 308.549,172.070 307.407 C 167.194 306.492,151.065 301.254,146.289 299.035 C 144.785 298.336,142.588 297.641,141.406 297.492 C 139.156 297.207,138.565 296.847,131.960 291.732 C 130.388 290.515,127.290 288.452,125.075 287.148 C 120.669 284.553,117.172 282.030,114.453 279.484 C 113.486 278.578,111.698 277.040,110.479 276.065 C 108.423 274.421,106.238 272.163,98.931 264.136 C 82.628 246.227,71.730 221.731,69.354 197.656 C 69.258 196.689,69.006 194.580,68.793 192.969 C 68.580 191.357,68.295 187.666,68.159 184.766 C 67.785 176.755,66.890 174.257,63.457 171.639 C 61.415 170.081,57.388 169.867,55.469 171.215 M217.914 202.530 C 223.587 206.706,223.950 211.046,219.088 216.569 C 217.627 218.228,215.097 219.922,214.078 219.922 C 213.808 219.922,213.672 216.716,213.672 210.352 L 213.672 200.781 214.605 200.781 C 215.119 200.781,216.608 201.568,217.914 202.530 "
                                    stroke="none"
                                    fill="#6d5173"
                                ></path>
                            </g>
                        </svg>
                    </div>

                    <span
                        className="ml-2 text-2xl font-bold text-[#6d5173] cursor-pointer"
                        onClick={() => navigate('/admin')}
                    >
            Transcent
          </span>
                </div>

                {/* Navigation links */}
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/admin/staff"
                        className=" font-bold text-black hover:text-[#9D4EDD] transition-colors"
                    >
                        Nhân viên
                    </NavLink>
                    <NavLink
                        to="/admin/customer"
                        className="font-bold hover:text-[#9D4EDD] transition-colors"
                    >
                        Khách hàng
                    </NavLink>
                    <NavLink
                        to="/admin/permissions"
                        className="font-bold text-black hover:text-[#9D4EDD] transition-colors"
                    >
                        Phân quyền
                    </NavLink>
                    <NavLink
                        to="/admin/brief"
                        className="font-bold text-black hover:text-[#9D4EDD] transition-colors"
                    >
                        Hồ sơ
                    </NavLink>
                    <NavLink
                        to="/info"
                        className="font-bold text-black hover:text-[#9D4EDD] transition-colors"
                    >
                        Thông tin
                    </NavLink>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                    <Button className="font-bold bg-[#F1ECFF] border-none">
                        <i className="fas fa-bell"></i>
                        Thông báo
                        {/* Notification Icon */}
                    </Button>
                    <Dropdown className="font-bold bg-[#F1ECFF] border-none" menu={{items}} placement="bottomLeft">
                        <Button>Admin</Button>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
