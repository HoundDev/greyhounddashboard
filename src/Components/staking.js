/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

const REWARDS = {
  Secret: "125k",
  Legendary: "50k",
  Elite: "30k",
  Rare: "20k",
  Standard: "10k",
};

export default function NftHome(props) {
  const [nfts, setNfts] = useState([]);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [houndBalance, setHoundBalance] = useState(0);
  const [selectedNfts, setSelectedNfts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenInCOokie = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    if (tokenInCOokie) {
      setToken(tokenInCOokie.split('=')[1]);
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const getNumMinted = async () => {
      const url = "https://sapi.greyhoundcoin.net/api/getnfts";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xrpAddress: props.xrpAddress,
        }),
      });
      const data = await response.json();
      setNfts(data);
      //send request to /api/getnftsData
      const promises = Object.keys(data).map((index) => {
        return fetch("https://sapi.greyhoundcoin.net/api/getnftsData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nftId: index,
          }),
        });
      });
      const responses = await Promise.all(promises);
      const nftData = await Promise.all(responses.map((response) => response.json()));
      const nftss = {};
      nftData.forEach((nft) => {
        nftss[nft.id] = nft;
      });
      console.log(nftss);
      setNfts(nftss);
      }
    const getHoundBalance = async () => {
      const url = "https://sapi.greyhoundcoin.net/api/getHoundBalance";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xrpAddress: props.xrpAddress,
        }),
      });
      const data = await response.json();
      setHoundBalance(Number(data.balance).toFixed(0));
    };
    Promise.all([getNumMinted(), getHoundBalance()]);
  }, [props.xrpAddress]);

  useEffect(() => {
    if (token) {
      const url = "https://sapi.greyhoundcoin.net/api/getStakedNfts";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setStakedNfts(data.nfts);
        });
    }
  }, [token, props.xrpAddress]);

  return (
    <div className="content-body nft-lander">
      <div className="container-fluid ">
        <div className="single-nft">
          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12 mb-5">
              <div className="nft-container">
                <h1 className="banner-title fs-32  text-center mt-2 mb-5">
                  Lock Hounds & Earn
                </h1>
                <div className="row">
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4">
                    <div className="card logo-bg">
                      <div className="card-body text-center card-text  align-middle">
                        <h2 className=" text-white fs-32">{houndBalance}</h2>
                        <h2 className="text-white fs-14 mb-2 font-w600">
                          Hound Balance
                        </h2>
                        <a
                          href="/"
                          className="btn btn-border-white rounded-4 mb-2 mt-2 btn-md font-weight-bold"
                        >
                          Quick Swap
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4">
                    <div className="card logo-bg">
                      <div className="card-body text-center card-text  align-middle">
                        <h2 className=" text-white fs-32">
                          {
                            stakedNfts && Object.keys(stakedNfts).length
                          }
                        </h2>
                        <h2 className="text-white fs-14 mb-2 font-w600">
                          Hounds Locked
                        </h2>
                        <a
                          href="http://localhost:3000/nftSteps"
                          className="btn btn-border-white rounded-4 mb-2 mt-2 btn-md font-weight-bold"
                        >
                          Mint Now
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-xxl-4 col-lg-4 col-sm-4">
                    <div className="card logo-bg">
                      <div className="card-body text-center card-text  align-middle">
                        <h2 className=" text-white fs-32">0</h2>
                        <h2 className="text-white fs-14 mb-2 font-w600">
                          Unclaimed Rewards
                        </h2>
                        <a
                          href="/nftSteps"
                          className="btn btn-primary rounded-4 mb-2 mt-2 btn-md font-weight-bold"
                        >
                          Claim Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card stakingTabs mt-3 mt-sm-0 ">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#wallet"
                        role="tab"
                        aria-selected="true"
                      >
                        Wallet
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#locked"
                        role="tab"
                        aria-selected="false"
                      >
                        Locked
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-0 tab-content">
                  <div className="tab-pane active" id="wallet">
                    {/*start of wallet*/}
                    {Object.keys(nfts).map((index) => {
                      if (stakedNfts.includes(index)) {
                        return null
                      } 
                      console.log(nfts[index])
                      return (
                        <div
                          className="card flex justify-between mb-2 stakeNft"
                          key={index}
                        >
                          <div className="flex ">
                            <div className="py-3 px-4 items-center flex bg-darker nftStart">
                              <div className="toggle-pill-dark">
                                <input
                                  type="checkbox"
                                  id={`pill-${index}`}
                                  className="mb-0"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedNfts([
                                        ...selectedNfts,
                                        index
                                      ]);
                                    } else {
                                      setSelectedNfts(
                                        selectedNfts.filter(
                                          (nft) => nft !== index
                                        )
                                      );
                                    }
                                  }}
                                  checked={selectedNfts.includes(
                                    index
                                  )}
                                  name="check"
                                />

                                <label for={`pill-${index}`} className="mb-0"></label>
                              </div>
                            </div>
                            <div className="items-center py-3 px-4 flex nftMiddle">
                              <span className="flex items-center ">
                                <img src={"https://app.greyhoundcoin.net/images/houndies/" + nfts[index]?.name?.split("#")[1] + ".png"} className="mr-3" />
                                <span className="text-white font-weight-bold">
                                  {/* {nft.name}{" "} */}
                                  {nfts[index].name}{" "}
                                  <span className="fs-12 font-weight-normal font-primary">
                                    {nfts[index].tier}
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div className="items-center py-3 px-4 flex nftMiddle">
                              <span className="flex items-center ">
                                <img
                                  src="/images/svg/logo-icon.svg"
                                  className="logoIcon inline mr-2"
                                />
                                <span className="text-white font-weight-bold">
                                  {REWARDS[nfts[index].tier]} $HOUND{" "}
                                  <span className="fs-12 font-weight-normal font-primary">
                                    /per week
                                  </span>
                                </span>
                              </span>
                            </div>

                            <div className="items-center py-3 px-2 flex bg-darker text-white font-weight-bold nftEnd">
                              <span className="flex mx-auto">Unlocked</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="row align-items-center  text-center mt-4">
                      <div className="col-auto mx-auto">
                        <p className="mb-2 fs-14">{selectedNfts.length} NFT(s) Selected</p>
                        <a
                          className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2 items-center px-3"
                          onClick={(e) => {
                            e.preventDefault();
                            const url = "https://sapi.greyhoundcoin.net/api/stakeNft";
                            fetch(url, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                nfts: selectedNfts,
                                token: token,
                              }),
                            }).then((response) => {
                              if (response.status === 200) {
                                window.location.reload();
                              } else {
                                alert("Error staking NFTs");
                              }
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="lockIcon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </a>

                        <button
                          className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2"
                          onClick={(e) => {
                            e.preventDefault();
                            //only select nfts which are not staked
                            setSelectedNfts(Object.keys(nfts).filter((nft) => !stakedNfts.includes(nft)));
                          }}
                        >
                          Select All
                        </button>
                      </div>
                    </div>

                    {/*End of wallet*/}
                  </div>
                  <div className="tab-pane" id="locked">
                    {/*start off locked*/}
                    {Object.keys(nfts).map((index) => {
                      if (!stakedNfts.includes(index)) {
                        return null
                      } 
                      return (
                        <div
                          className="card flex justify-between mb-2 stakeNft"
                          key={index}
                        >
                          <div className="flex ">
                            <div className="py-3 px-4 items-center flex bg-darker nftStart">
                              <div className="toggle-pill-dark">
                                <input
                                  type="checkbox"
                                  id={`pill-${index}`}
                                  className="mb-0"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedNfts([
                                        ...selectedNfts,
                                        index
                                      ]);
                                    } else {
                                      setSelectedNfts(
                                        selectedNfts.filter(
                                          (nft) => nft !== index
                                        )
                                      );
                                    }
                                  }}
                                  checked={selectedNfts.includes(
                                    index
                                  )}
                                  name="check"
                                />

                                <label for={`pill-${index}`} className="mb-0"></label>
                              </div>
                            </div>
                            <div className="items-center py-3 px-4 flex nftMiddle">
                              <span className="flex items-center ">
                                <img src={"https://marketplace-api.onxrp.com/api/image/" + nfts[index].id} className="mr-3" />
                                <span className="text-white font-weight-bold">
                                  {/* {nft.name}{" "} */}
                                  {nfts[index].name}{" "}
                                  <span className="fs-12 font-weight-normal font-primary">
                                    {nfts[index].tier}
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div className="items-center py-3 px-4 flex nftMiddle">
                              <span className="flex items-center ">
                                <img
                                  src="/images/svg/logo-icon.svg"
                                  className="logoIcon inline mr-2"
                                />
                                <span className="text-white font-weight-bold">
                                  {REWARDS[nfts[index].tier]} $HOUND{" "}
                                  <span className="fs-12 font-weight-normal font-primary">
                                    /per week
                                  </span>
                                </span>
                              </span>
                            </div>

                            <div className="items-center py-3 px-2 flex bg-darker text-white font-weight-bold nftEnd">
                              <span className="flex mx-auto">Locked</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    )}
                    {/*end off locked*/}
                    <div className="row align-items-center  text-center mt-4">
                      <div className="col-auto mx-auto">
                        <p className="mb-2 fs-14">{selectedNfts.length} NFT(s) Selected</p>
                        <a
                          className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2 items-center px-3"
                          onClick={(e) => {
                            e.preventDefault();
                            const url = "https://sapi.greyhoundcoin.net/api/unstakesNft";
                            fetch(url, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                nfts: selectedNfts,
                                token: token,
                              }),
                            }).then((response) => {
                              if (response.status === 200) {
                                window.location.reload();
                              } else {
                                alert("Error staking NFTs");
                              }
                            });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="lockIcon"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </a>

                        <button
                          className="btn btn-primary rounded-4 mb-2 mt-0 btn-md mr-2"
                          onClick={(e) => {
                            e.preventDefault();
                            //only select nfts which are staked
                            setSelectedNfts(Object.keys(nfts).filter((nft) => stakedNfts.includes(nft)));
                          }}
                        >
                          Select All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
