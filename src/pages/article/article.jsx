import React, { useState, useEffect } from 'react';
import { getArticleList, deleteArticle } from '../../redux/actions';
import { connect } from 'react-redux';
import { Table, Tag, Space, Spin } from 'antd';

import './article.less';

function Article(props) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        props.getArticleList();
        setLoading(true);
    }, []);

    useEffect(() => {
        console.log(props)
        if (JSON.stringify(props.data)==='{}') return;
        if (!props.data.code==0) return;
        setLoading(false);
        props.data.data.map((item, index) => {
            item = {
                key: index + 1,
                title: item.title,
                desc: item.desc,
                tags: item.tags,
                publishTime: item.publishTime
            }
        })
        setData(props.data.data);
    }, [props.data]);

    function editor(e) { //编辑
        console.log(e)
    }

    function deleted(text) { //删除
        const { _id } = text;
        props.deleteArticle(_id);
        const newData = data.filter((i)=> {return i._id !==_id});
        setData(newData);
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            render: text => <a>{text}</a>,
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            key: 'desc',
            ellipsis: true
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            ellipsis: true,
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 3 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'PublishTime',
            dataIndex: 'publishTime',
            key: 'publishTime',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <a onClick={ editor }>Editor</a> */}
                    <a onClick={ ()=> deleted(text) }>Delete</a>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Spin spinning={loading}>
                <Table columns={columns} dataSource={data} />
            </Spin>
        </>
    )
}
export default connect(
    state => ({ data: state.data}),
    { getArticleList, deleteArticle }
)(Article);