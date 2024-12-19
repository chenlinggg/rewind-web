"use client";
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Input, Form, Select, message } from "antd";
import OperateModal from "@/components/operate-modal";
import { useTranslation } from "@/utils/i18n";
import type { FormInstance } from "antd";
import { ModalSuccess, ModalRef } from "@/app/node-manager/types/common";
import type { TableDataItem } from "@/app/node-manager/types/common";

const SidecarModal = forwardRef<ModalRef, ModalSuccess>(
  ({ onSuccess }, ref) => {
    const sidecarformRef = useRef<FormInstance>(null);
    //设置弹窗状态
    const [SidecarVisible, setSidecarVisible] =
      useState<boolean>(false);
    //设置表当的数据
    const [sidecarFormData, setSidecarFormData] =
      useState<TableDataItem>();
    const [type, setType] = useState<string>("");
    const { t } = useTranslation();
    useImperativeHandle(ref, () => ({
      showModal: ({ type, form }) => {
        debugger
        // 开启弹窗的交互
        setSidecarVisible(true);
        setType(type);
        setSidecarFormData(form);
      },
    }));

    //初始化表单的数据
    useEffect(() => {
      sidecarformRef.current?.resetFields()
    }, [SidecarVisible, sidecarFormData]);

    //关闭用户的弹窗(取消和确定事件)
    const handleCancel = () => {
      setSidecarVisible(false);
    };
    const handleConfirm = () => {
      setSidecarVisible(false);
      message.success("成功添加节点成功");
      onSuccess();
      setSidecarVisible(false);
    };

    //选择操作系统
    function handleChangeOperatingsystem(value: string) {
      console.log('选择的操作系统是', value)
    }

    function showSidecarForm(type: string) {
      if (type === 'uninstall') {
        return (
          <div>
            <h1>1.Windows</h1>
            <div className="border border-black w-[466px] h-[120px] mt-2">我是展示的区域</div>
            <h1 className="mt-2">2.Linux</h1>
            <div className="border border-black w-[466px] h-[120px] mt-2">我是展示的区域</div>
          </div>
        );
      }
      return (<Form ref={sidecarformRef} layout="vertical" colon={false}>
        <Form.Item
          name="ipaddress"
          label={t("node-manager.cloudregion.node.ipaddress")}
        >
          <Input className="" />
        </Form.Item>
        <Form.Item
          name="operatingsystem"
          label={t("node-manager.cloudregion.node.system")}
        >
          <Select
            defaultValue="linux"
            options={[
              { value: 'linux', label: 'Linux' },
              { value: 'windows', label: 'Windows' }
            ]}
            onChange={handleChangeOperatingsystem}
          >
          </Select>
        </Form.Item>
        <Form.Item
          name="installationguide"
          label={t("node-manager.cloudregion.node.guide")}
        >
          <div className="border-2 border-black-100 h-[121px]">我是一个展示的区域</div>
        </Form.Item>
      </Form>);
    }

    return (
      <OperateModal
        title={t(`node-manager.cloudregion.node.${type}`)}
        visible={SidecarVisible}
        okText={t("common.confirm")}
        cancelText={t("common.cancel")}
        onCancel={handleCancel}
        onOk={handleConfirm}
      >
        {showSidecarForm(type)}
      </OperateModal>
    );
  }
);
SidecarModal.displayName = "RuleModal";
export default SidecarModal;
