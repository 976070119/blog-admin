import React, { useState, useEffect } from 'react';
import { Image, message, Space, Avatar, Input, Button, Table, Spin } from 'antd';
import { PlusOutlined, PlayCircleOutlined } from '@ant-design/icons';
import './music.less';
import { connect } from 'react-redux';
import { searchMusic, checkMusic, musicUrl, musicLrc } from '../../redux/actions';
import { reqMusicPic } from '../../api/api';

const { Search } = Input;
function Music(props) {
    const columns = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => <Avatar style={{'cursor': 'pointer'}}
                src={<Image src={text} />}
            />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Singer',
            dataIndex: 'singer',
            key: 'singer',
        },
        {
            title: 'Album',
            dataIndex: 'album',
            key: 'album',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a title='播放' onClick={() => play(text)}><PlayCircleOutlined /></a>
                    <a title='添加到播放列表' onClick={() => addToList(text)}><PlusOutlined /></a>
                </Space>
            ),
        },
    ];

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // const [check, setCheck] = useState(false);
    // const [url, setUrl] = useState(null);
    const [lrc, setLrc] = useState(null);

    function play(data) {
        const { id, name, avatar,  singer} = data;
        // props.checkMusic({id});
        // if(!check) {
        //     return message.error('亲爱的,暂无版权');
        // }
        // props.musicUrl({id});
        props.musicLrc({id});
        window.ap.audio.setAttribute('src', `https://music.163.com/song/media/outer/url?id=${id}.mp3`);
        window.ap.play();
        window.ap.lrc.hide();
    }

    function addToList(data) {
        const { id, name, avatar,  singer} = data;
        props.musicLrc({id});
        const ap = window.ap;
        const arr = JSON.parse(localStorage.getItem('info'));
        const item = {
            name,
            url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
            lrc,
            artist: singer,
            cover: avatar,
            theme: '#' + generateRandomAlphaNum(6)
        }
        arr.push(item);
        ap.list.add(item);
        localStorage.setItem('info', JSON.stringify(arr));

        // console.log(props, lrc,'addToList')
    }

    // useEffect(()=> {
    //     if(!props.music.check) return
    //     setCheck(true);
    // }, [props.music.check]);

    // useEffect(()=> {
    //     if(!props.music.url) return;
    //     if(props.music.url[0].url) {
    //         setUrl(props.music.url[0].url);
    //         setUrl(`https://music.163.com/song/media/outer/url?id=${id}.mp3`);
    //     } else {
    //         setUrl(null);
    //     }
    // }, [props]);

    useEffect(()=> {
        let lrc = '';
        if(!props.music.lrc) return;
        if(props.music.lrc) {
            if(props.music.lrc.lrc.version) {
                lrc += props.music.lrc.lrc.lyric;
            } 
            if(props.music.lrc.tlyric.version) {
                lrc += props.music.lrc.lrc.lyric;
            } 
            setLrc(lrc);
        } else {
            setLrc('暂无歌词');
        }
        // ap.audio=[
        //     {
        //         name: 'Sweet but Psycho',
        //         artist: 'Ava Max',
        //         url: 'https://music.163.com/song/media/outer/url?id=1300528275.mp3',
        //         cover: 'http://p3.music.126.net/gee-5oSaBNjcg3fhcBJdBQ==/109951163781396587.jpg',
        //         lrc: 'http://47.100.39.25:3000/lyric?id=1300528275',
        //         theme: '#cfd0c2'
        //     }
        // ]
    }, [props]);

    function getPic(id) {
        return reqMusicPic({id});//: item.album.id
    }

    function generateRandomAlphaNum(len) {
        var rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(16).substr(2));
        return rdmString.substr(0, len);
    }

    useEffect(()=> {
        if(!props.music.result) return;
        const {result} = props.music;

        let newArr = []
        result.songs.map(async(item, index)=> {
            newArr.push({
                id: item.id,
                number: index+1,
                // avatar: res.data.album.picUrl + '?param80y80',
                name: item.name,
                singer: item.artists[0].name,
                album: item.album.name,
            })
            await getPic(item.album.id).then( res => {
                newArr[index].avatar= res.data.album.picUrl + '?param80y80'
            })
        })
        setData(newArr);
        setLoading(false);
    }, [props.music])

    function search(keywords) {
        setLoading(true);
        props.searchMusic({keywords});
    }


    return (
        <div>
            <Space direction="vertical" size={'middle'}>
                <Search placeholder="input search loading with enterButton" allowClear={false} onSearch={search} loading={loading} enterButton/>
                <Spin spinning={loading}>{data ? <Table columns={columns} dataSource={data} /> : null}</Spin>
            </Space>
        </div>
    )
}
export default connect(
    state => ({ music: state.music }),
    { searchMusic, checkMusic, musicUrl, musicLrc }
)(Music);