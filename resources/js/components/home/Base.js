import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ImageList, TextField } from "@mui/material";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { useStateIfMounted } from "use-state-if-mounted";
import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";

function Base(props) {
    const [animal, setAnimal] = useState("");
    const animalChange = (event) => {
        setAnimal(event.target.value);
    };

    const [kind, setKind] = useState("");
    const kindChange = (event) => {
        setKind(event.target.value);
    };

    const [order, setOrder] = useState("");
    const orderChange = (event) => {
        setOrder(event.target.value);
    };

    const [keyword, setKeyword] = useState("");
    const keywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const [posts, setPosts] = useStateIfMounted([]);
    const [hasMore, setHasMore] = useStateIfMounted(true);

    const loadMore = async (page) => {
        const response = await axios.get("api/homeIndex/", {
            params: {
                ainmal: animal,
                kind: kind,
                order: order,
                keyword: keyword,
                page: page,
            },
        });
        console.log(response.data);
        const result = response.data;

        if (result.length < 1) {
            setHasMore(false);
            console.log("dead");
            return;
        }

        setPosts([...posts, ...result]);
    };

    // const search = async (page) => {
    //     const response = await axios.get("api/homeIndex/", {
    //         params: {
    //             ainmal: animal,
    //             kind: kind,
    //             order: order,
    //             keyword: keyword,
    //             page: page,
    //         },
    //     });
    //     const result = response.data;
    // };

    const index = (
        <ImageList className="w-full">
            {posts.map((post) => (
                <Post key={post.id} content={post} />
            ))}
        </ImageList>
    );
    const detail = (
        <ImageList className="w-full">
            {posts.map((post) => (
                <Post key={post.id} content={post} />
            ))}
        </ImageList>
    );

    const loader = (
        <div className="loader" key={0}>
            Loading ...
        </div>
    );

    return (
        <div>
            <div className="flex content-between">
                <Box className="flex-1 m-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            ??????
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={animal}
                            label="animal"
                            onChange={animalChange}
                        >
                            <MenuItem value={1}>??????</MenuItem>
                            <MenuItem value={2}>??????</MenuItem>
                            <MenuItem value={3}>??????</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="flex-1 m-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            ???????????????
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kind}
                            label="kind"
                            onChange={kindChange}
                        >
                            <MenuItem value={1}>?????????</MenuItem>
                            <MenuItem value={2}>?????????</MenuItem>
                            <MenuItem value={3}>?????????????????????</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="flex-1 m-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            ?????????
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            label="order"
                            onChange={orderChange}
                        >
                            <MenuItem value={1}>????????????</MenuItem>
                            <MenuItem value={2}>?????????</MenuItem>
                            <MenuItem value={3}>
                                ???????????????????????????????????????
                            </MenuItem>
                            <MenuItem value={4}>?????????</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="flex justify-end">
                <div className="w-1/4 m-5">
                    <div className="m-auto w-full">
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="?????????????????????"
                            variant="outlined"
                            onChange={keywordChange}
                        />
                    </div>
                </div>
                <div className="w-1/4 m-5">
                    <div
                        className="text-center m-auto py-3 px-6 text-xl rounded-md
                    text-blue-300 bg-transparent border border-blue-300 hover:text-white hover:bg-blue-300"
                        // onClick={search}
                    >
                        ??????
                        <SavedSearchIcon />
                    </div>
                </div>
            </div>
            <div className="overflow-auto" style={{ height: "1000px" }}>
                <InfiniteScroll
                    loadMore={loadMore}
                    hasMore={hasMore}
                    loader={loader}
                    useWindow={false}
                >
                    {index}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Base;
